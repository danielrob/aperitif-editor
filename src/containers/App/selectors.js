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

export const getCurrentFileInvocations = createSelector( // which also represent all imports
  selectInvocations,
  getCurrentFileExpressions,
  (invocations, expressions) => expressions.reduce((out, expression) => ([
    ...out,
    ...expression.invocationIds.map(id => invocations[id]),
  ]), [])
)

export const getCurrentFileExpressionWithDefaultExport = createSelector(
  getCurrentFileExpressions,
  expressions => expressions.find(({ exportType }) => exportType === DEFAULT)
)
