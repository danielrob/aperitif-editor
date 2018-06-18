import { partition } from 'lodash'
import { createSelector } from 'reselect'
import { DIR } from 'constantz'
import { sortAlphabetically } from 'utils'

export const selectCurrentFileId = s => s.app.present.editor.currentFileId
export const selectSelectedFileId = s => s.app.present.editor.selectedFileId
export const selectRootFiles = s => s.app.present.editor.rootFiles
export const selectNames = s => s.app.present.names || {}
export const selectFiles = s => s.app.present.files || {}
export const selectDeclarations = s => s.app.present.declarations || {}
export const selectInvocations = s => s.app.present.invocations || {}
export const selectCallParams = s => s.app.present.callParams || {}
export const selectDeclParams = s => s.app.present.declParams || {}
export const selectPreferences = s => s.app.present.preferences

/*
  Atomic model selectors
*/
export const makeSelectInvocation = () => createSelector(
  selectInvocations,
  (state, props) => props.invocationId,
  (invocations, invocationId) => {
    const { id, ...rest } = invocations[invocationId]
    return {
      invocationId,
      ...rest,
    }
  }
)

/*
  Single Model selectors - `makeSelect${modelName}`
*/
export const makeSelectName = () => (state, props) => selectNames(state)[props.nameId]

export const makeSelectDeclaration = () => createSelector(
  selectDeclarations,
  (state, props) => props.declarationId,
  (declarations, declarationId) => {
    const { id, ...rest } = declarations[declarationId]
    return {
      declarationId,
      ...rest,
    }
  }
)

export const makeSelectFile = () => createSelector(
  selectNames,
  selectFiles,
  selectCurrentFileId,
  selectSelectedFileId,
  (state, props) => props.fileId,
  (names, files, currentFileId, selectedFileId, fileId) => {
    const { nameId, type, children, declarationIds } = files[fileId]
    const sortedChildren = children.sort((a, b) => {
      const aName = names[files[a].nameId]
      const bName = names[files[b].nameId]
      return (
        (aName === 'index' && 1) ||
        (bName === 'index' && -1) ||
        sortAlphabetically(aName, bName)
      )
    })


    const [directories, fichiers] = partition(sortedChildren, id =>
      files[id].isDirectory
    )

    const isDir = !!children.length || type === DIR

    return {
      fileId,
      nameId,
      name: names[nameId],
      type,
      extension: type && !isDir ? `.${type}` : '',
      fileChildren: [...directories, ...fichiers],
      isDirectory: isDir,
      isCurrent: fileId === currentFileId,
      isSelected: fileId === selectedFileId,
      containsCurrent: children.includes(currentFileId),
      declarationIds,
    }
  }
)

