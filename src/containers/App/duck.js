import getTestDB from './getTestDB'

export default function appReducer(state = getTestDB(), action) {
  switch (action.type) {
    default:
      return state
  }
}
