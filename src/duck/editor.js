import { createAction } from 'redux-actions'

import { DIR } from 'constantz'

export const CHANGE_FILE = 'CHANGE_FILE'
export const NEW_CONTAINER_PLEASE = 'NEW_CONTAINER_PLEASE'

export default (state, action) => ({
  ...state,
  editor: editorReducer(state.editor, action, state),
})

function editorReducer(state, action, appState) {
  switch (action.type) {
    case CHANGE_FILE: {
      const { currentFileId } = state
      const { files, names } = appState
      let { payload: nextId } = action
      const { type, children } = files[nextId]

      if (type === DIR) {
        nextId = children.find(fileId => names[files[fileId].nameId].includes('index'))
      }

      return {
        ...state,
        currentFileId: nextId || currentFileId,
        selectedFileId: action.payload,
      }
    }

    case NEW_CONTAINER_PLEASE: {
      return {
        ...state,
        currentFileId: null,
        selectedFileId: null,
      }
    }

    default: {
      return state
    }
  }
}

export const changeFile = createAction(
  CHANGE_FILE
)

export const newContainerPlease = createAction(
  NEW_CONTAINER_PLEASE
)
