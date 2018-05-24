import { createSelector } from 'reselect'

import { selectNames, selectFiles, selectCurrentFileId } from 'selectors'

const selectFile = (state, props) => selectFiles(state)[props.fileId]

export const makeGetFile = () => createSelector(
  selectNames,
  selectFiles,
  selectCurrentFileId,
  selectFile,
  (names, files, currentFileId, file) => {
    const { id, nameId, type, children, declarationIds } = file

    return {
      name: names[nameId],
      type,
      fileChildren: children,
      isDirectory: !!children.length,
      isCurrent: id === currentFileId,
      declarationIds,
    }
  }
)
