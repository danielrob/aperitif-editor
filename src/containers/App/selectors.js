import { isNumber } from 'lodash'
import { createSelector } from 'reselect'

import { exportTypes } from 'constantz'

const { DEFAULT } = exportTypes

// 'dumb' selectors
export const selectCurrentFileId = s => s.app.currentFileId
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
    const reduceInvocations = (innerOut, id) => {
      const invocation = invocations[id]
      const returnInvocation = isNumber(invocation.nameOrNameId) ? [{
        importName: names[invocation.nameOrNameId],
        source: names[invocation.source] || invocation.source,
      }] : []
      return [
        ...innerOut,
        ...returnInvocation,
        ...invocation.invocationIds.reduce(reduceInvocations, []),
      ]
    }
    return ([
      ...out,
      ...expression.invocationIds.reduce(reduceInvocations, []),
    ])
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
