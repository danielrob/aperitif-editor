import { createSelector } from 'reselect'
import { selectFiles, selectCurrentFileId, selectDeclarations } from 'selectors'

export const selectCurrentFile = createSelector(
  selectFiles,
  selectCurrentFileId,
  (files, currentFileId) => files[currentFileId]
)

export const getCurrentFileDeclarations = createSelector(
  selectDeclarations,
  selectCurrentFile,
  (declarations, currentFile) =>
    currentFile ? currentFile.declarationIds.map(id => declarations[id]) : []
)
