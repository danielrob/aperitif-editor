import undoable, { groupByActionTypes } from 'redux-undo'

import coreReducer, { UPDATE_NAME } from './core'
import editorReducer from './editor'
import preferencesReducer from './preferences'

import getInitialState from './getInitialState'

export default undoable(reduceReducers, {
  groupBy: groupByActionTypes(UPDATE_NAME),
})

function reduceReducers(state = getInitialState(), action) {
  const reducers = [coreReducer, editorReducer, preferencesReducer]
  return reducers.reduce((state, reducer) => reducer(state, action), state)
}

export * from './core'
export * from './editor'
export * from './preferences'
