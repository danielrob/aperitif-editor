import { createAction } from 'redux-actions'

import { DIR } from 'constantz'

export const CHANGE_EDITOR_CURRENT_FILE = 'CHANGE_EDITOR_CURRENT_FILE'

export default (state, action) => ({
  ...state,
  editor: editorReducer(state.editor, action, state),
})

function editorReducer(state, action, appState) {
  switch (action.type) {
    case CHANGE_EDITOR_CURRENT_FILE: {
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

    default: {
      return state
    }
  }
}

export const changeFile = createAction(
  CHANGE_EDITOR_CURRENT_FILE
)
