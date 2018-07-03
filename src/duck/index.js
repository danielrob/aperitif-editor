import undoable, { groupByActionTypes } from 'redux-undo'

import coreReducer, { UPDATE_NAME, UPDATE_DECLARATION } from './duck'
import editorReducer from './editor'
import preferencesReducer from './preferences'

import { getInitialState } from './tasks'

export default undoable(reduceReducers, {
  groupBy: groupByActionTypes([UPDATE_NAME, UPDATE_DECLARATION]),
})

function reduceReducers(state = getInitialState(), action) {
  const reducers = [coreReducer, editorReducer, preferencesReducer]
  return reducers.reduce((state, reducer) => reducer(state, action), state)
}

export * from './duck'
export * from './editor'
export * from './preferences'
