import { createAction } from 'redux-actions'

import { DIR } from 'constantz'

export const CHANGE_FILE = 'CHANGE_FILE'
export const OPEN_API_INPUT_SCREEN = 'OPEN_API_INPUT_SCREEN'

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

    case OPEN_API_INPUT_SCREEN: {
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

export const openAPIInputScreen = createAction(
  OPEN_API_INPUT_SCREEN
)
