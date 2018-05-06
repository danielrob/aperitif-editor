import { isNumber, uniqBy, sortBy } from 'lodash'
import { createSelector } from 'reselect'

import { composed } from 'utils'
import { LOOKTHROUGH, DEFAULT } from 'constantz'

export const selectCurrentFileId = s => s.app.currentFileId
export const selectRootFiles = s => s.app.rootFiles
export const selectNames = s => s.app.names
export const selectFiles = s => s.app.files
export const selectExpressions = s => s.app.expressions
export const selectInvocations = s => s.app.invocations
export const selectParams = s => s.app.params

export const selectCurrentFile = createSelector(
  selectFiles,
  selectCurrentFileId,
  (files, currentFileId) => files[currentFileId]
)

export const getCurrentFileExpressions = createSelector(
  selectExpressions,
  selectCurrentFile,
  (expressions, currentFile) => currentFile.expressionIds.map(id => expressions[id])
)

export const getCurrentFileImports = createSelector( // which also represent all imports
  selectInvocations,
  getCurrentFileExpressions,
  selectNames,
  composed(
    (invocations, expressions, names) => expressions.reduce((out, expression) => {
      const reduceRecursively = (priorInvocations, id) => {
        const { nameOrNameId, source, invocationIds } = invocations[id]
        const thisInvocation = isNumber(nameOrNameId) && expression.nameId !== nameOrNameId ? [{
          id,
          importName: names[nameOrNameId],
          source: source || `../${names[nameOrNameId]}`, // TODO: derive paths
          order: nameOrNameId,
        }] : []
        return [
          ...priorInvocations,
          ...thisInvocation,
          ...invocationIds.reduce(reduceRecursively, []),
        ]
      }
      return ([...out, ...expression.invocationIds.reduce(reduceRecursively, [])])
    }, []),
    imports => uniqBy(imports, 'importName'),
    imports => sortBy(imports, 'order'),
  )
)

export const getCurrentFileDefaultExport = createSelector(
  getCurrentFileExpressions,
  selectNames,
  (expressions, names) => {
    const exprWithDefExport = expressions.find(({ exportType }) => exportType === DEFAULT)
    return exprWithDefExport && names[exprWithDefExport.nameId]
  }
)

export const selectCurrentFileExpressions = createSelector(
  selectNames,
  getCurrentFileExpressions,
  selectParams,
  selectInvocations,
  (names, expressions, params, invocations) =>
    expressions
      .map(({ id, nameId, type, invocationIds, paramIds, exportType }) => ({
        id,
        name: names[nameId],
        type,
        invocations: invocationIds.map(invocationId => invocations[invocationId]),
        params: paramIds.map(paramId => params[paramId]),
        exportType,
      }))
      .filter(({ type }) => type !== LOOKTHROUGH)
)
