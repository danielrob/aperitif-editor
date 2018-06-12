import { uniqBy, sortBy, groupBy, map } from 'lodash'
import { createSelector } from 'reselect'

import { composed } from 'utils'
import {
  COMPONENT_INVOCATION,
  STYLED_COMPONENT,
  STATELESS_FUNCTION_COMPONENT,
  CLASS_COMPONENT,
  RESOLVE_ALIASES,
} from 'constantz'

import {
  selectFiles,
  selectInvocations,
  selectDeclarations,
  selectNames,
} from 'selectors'

import {
  selectCurrentFile,
  getCurrentFileDeclarations,
} from './selectors'

export const getCurrentFileImports = createSelector(
  selectCurrentFile,
  selectFiles,
  selectInvocations,
  selectDeclarations,
  getCurrentFileDeclarations,
  selectNames,
  composed(
    (currentFile, files, invocations, allDeclarations, declarations, names) => {
      const imports = []

      // Much simpler to handle these specific import cases here than in an abstract manner
      if (declarations.find(({ type }) => type === STYLED_COMPONENT)) {
        imports.push({ id: 'styled', importName: 'styled', source: 'styled-components', order: 1 })
      }

      if (
        declarations.find(({ type }) =>
          [STATELESS_FUNCTION_COMPONENT, CLASS_COMPONENT].includes(type))
      ) {
        imports.push({ id: 'react', importName: 'React', source: 'react', order: 0 })
      }

      if (
        declarations.find(({ type, declParamIds }) =>
          declParamIds.length && [STATELESS_FUNCTION_COMPONENT, CLASS_COMPONENT].includes(type))
      ) {
        imports.push({ id: 'prop-types', importName: 'T', source: 'prop-types', order: -1 })
      }

      // For the invocations in the invocation trees in the declaration trees of the declarations...
      // ... we check if each invocation represents an import. If so resolve that import.
      return declarations.reduce((out, declaration) => {
        const reduceRecursively = (priorInvocations, id) => {
          const { nameId, type, source, invocationIds, declarationId } = invocations[id]

          let thisInvocation
          if (isAnImportInvocation(nameId, type, declarations, source)) {
            const resolvedSource = source || getRelativePath(
              currentFile, declarationId, files, allDeclarations, names, nameId
            )
            thisInvocation = [{
              id, // just needs to be unique
              importName: names[nameId],
              source: resolvedSource,
              order: nameId,
              declarationIds: [declarationId],
              isNamed: RESOLVE_ALIASES.includes(resolvedSource),
            }]
          } else {
            thisInvocation = []
          }

          return [
            ...priorInvocations,
            ...thisInvocation,
            ...invocationIds.reduce(reduceRecursively, []),
          ]
        }

        const reduceDeclarationsRecursively = (priorDeclarations, id) => {
          const { invocationIds } = allDeclarations[id]
          return [
            ...priorDeclarations,
            ...invocationIds.reduce(reduceRecursively, []),
          ]
        }

        return ([
          ...out,
          ...declaration.invocationIds.reduce(reduceRecursively, []),
          ...declaration.declarationIds.reduce(reduceDeclarationsRecursively, []),
        ])
      }, imports)
    },
    imports => uniqBy(imports, 'importName'),
    imports => sortBy(imports, 'order'),
    imports => map(groupBy(imports, 'source'), group =>
      group.reduce(({ importName, declarationIds, ...rest }, current) => ({
        ...rest,
        declarationIds: [...declarationIds, ...current.declarationIds],
        importName: importName ? `${importName}, ${current.importName}` : current.importName,
      })),
    ),
  )
)


const isAnImportInvocation = (invocationNameId, type, declarations, source) =>
  source ||
  (
    !declarations.find(({ nameId }) => nameId === invocationNameId) &&
    [COMPONENT_INVOCATION].includes(type)
  )


const getRelativePath = (currentFile, declarationId, files, declarations, names, nameId) => {
  const { fileId: sourceFileId } = declarations[declarationId]

  let currentFileAncestor = currentFile
  let backwardsPath = ''

  let sourceAncestor = files[sourceFileId]
  let forwardsPath = `${names[nameId]}`

  if (names[sourceAncestor.nameId] === 'index') {
    sourceAncestor = files[sourceAncestor.parentId]
  }

  while (sourceAncestor.parentId !== currentFileAncestor.parentId) {
    if (sourceAncestor.parentId) {
      sourceAncestor = files[sourceAncestor.parentId] || {}
      forwardsPath = `${names[sourceAncestor.nameId]}/${forwardsPath}`
    }

    if (currentFileAncestor.parentId) {
      currentFileAncestor = files[currentFileAncestor.parentId]
      backwardsPath = `../${backwardsPath}`
    }
  }

  const indexedAlias =
    !sourceAncestor.parentId &&
    RESOLVE_ALIASES.find(alias => forwardsPath.startsWith(alias))

  return indexedAlias || `${backwardsPath || './'}${forwardsPath}`
}
