import { createSelector } from 'reselect'

import { LOOKTHROUGH, DEFAULT } from 'constantz'

export const selectCurrentFileId = s => s.app.currentFileId
export const selectRootFiles = s => s.app.rootFiles
export const selectNames = s => s.app.names
export const selectFiles = s => s.app.files
export const selectDeclarations = s => s.app.declarations
export const selectInvocations = s => s.app.invocations
export const selectParams = s => s.app.params

export const makeSelectName = () => (state, props) => selectNames(state)[props.nameId]

export const selectCurrentFile = createSelector(
  selectFiles,
  selectCurrentFileId,
  (files, currentFileId) => files[currentFileId]
)

export const getCurrentFileDeclarations = createSelector(
  selectDeclarations,
  selectCurrentFile,
  (declarations, currentFile) => currentFile.declarationIds.map(id => declarations[id])
)

export const getCurrentFileDefaultExport = createSelector(
  getCurrentFileDeclarations,
  selectNames,
  (declarations, names) => {
    const exprWithDefExport = declarations.find(({ exportType }) => exportType === DEFAULT)
    return exprWithDefExport && names[exprWithDefExport.nameId]
  }
)

export const selectCurrentFileDeclarations = createSelector(
  selectNames,
  getCurrentFileDeclarations,
  selectParams,
  selectInvocations,
  (names, declarations, params, invocations) =>
    declarations
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
