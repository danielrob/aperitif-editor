import { uniqBy, sortBy } from 'lodash'
import { createSelector } from 'reselect'

import { composed } from 'utils'
import {
  PARAM_INVOCATION,
  STYLED_COMPONENT,
  STATELESS_FUNCTION_COMPONENT,
  CLASS_COMPONENT,
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
      // Much simpler to handle these specific import cases here than in an abstract manner
      const imports = []

      if (declarations.find(({ type }) => type === STYLED_COMPONENT)) {
        imports.push({ id: 'styled', importName: 'styled', source: 'styled-components', order: 1 })
      }

      if (
        declarations.find(({ type }) =>
          [STATELESS_FUNCTION_COMPONENT, CLASS_COMPONENT].includes(type))
      ) {
        imports.push({ id: 'react', importName: 'React', source: 'react', order: 0 })
      }

      return declarations.reduce((out, declaration) => {
        const reduceRecursively = (priorInvocations, id) => {
          const { nameId, type, source, invocationIds, declarationId } = invocations[id]
          const thisInvocation = isAnImportInvocation(nameId, type, declarations) ? [{
            id,
            importName: names[nameId],
            source: source || getRelativePath(
              currentFile, declarationId, files, allDeclarations, names, nameId
            ),
            order: nameId,
            declarationId,
          }] : []
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
  )
)


const isAnImportInvocation = (invocationNameId, type, declarations) =>
  !declarations.find(({ nameId }) => nameId === invocationNameId) &&
  ![PARAM_INVOCATION].includes(type)


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

  return `${backwardsPath || './'}${forwardsPath}`
}
