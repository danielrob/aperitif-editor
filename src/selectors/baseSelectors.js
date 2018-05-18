import { createSelector } from 'reselect'

import { LOOKTHROUGH, DEFAULT } from 'constantz'

export const selectCurrentFileId = s => s.app.currentFileId
export const selectRootFiles = s => s.app.rootFiles
export const selectNames = s => s.app.names
export const selectFiles = s => s.app.files
export const selectExpressions = s => s.app.expressions
export const selectInvocations = s => s.app.invocations
export const selectParams = s => s.app.params

export const makeSelectName = () => (state, props) => selectNames(state)[props.nameId]

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
      .map(({ id, nameId, type, invocationIds, declParamIds, exportType }) => ({
        id,
        name: names[nameId],
        type,
        invocations: invocationIds.map(invocationId => invocations[invocationId]),
        declParams: declParamIds.map(paramId => params[paramId]),
        exportType,
      }))
      .filter(({ type }) => type !== LOOKTHROUGH)
)
