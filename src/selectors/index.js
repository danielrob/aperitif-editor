import { isNumber } from 'lodash'
import { createSelector } from 'reselect'

import { LOOKTHROUGH, DEFAULT } from 'constantz'

// 'dumb' selectors
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
  (invocations, expressions, names) => expressions.reduce((out, expression) => {
    const reduceRecursively = (innerOut, id) => {
      const invocation = invocations[id]
      const returnInvocation = isNumber(invocation.nameOrNameId) ? [{
        id: invocation.id,
        importName: names[invocation.nameOrNameId],
        source: invocation.source || `../${names[invocation.nameOrNameId]}`, // TODO: derive paths
      }] : []
      return [
        ...innerOut,
        ...returnInvocation,
        ...invocation.invocationIds.reduce(reduceRecursively, []),
      ]
    }
    return ([...out, ...expression.invocationIds.reduce(reduceRecursively, [])])
  }, [])
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
