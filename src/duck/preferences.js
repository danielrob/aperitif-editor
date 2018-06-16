import { createAction } from 'redux-actions'

export const UPDATE_PREFERENCES = 'UPDATE_PREFERENCES'

export default function (state, action) {
  switch (action.type) {
    case UPDATE_PREFERENCES: {
      return {
        ...state,
        preferences: {
          ...state.preferences,
          ...action.payload,
        },
      }
    }

    default: {
      return state
    }
  }
}

export const updatePreferences = createAction(
  UPDATE_PREFERENCES
)
