import { debounce } from 'lodash'
import { CHANGE_FILE, OPEN_API_INPUT_SCREEN, UPDATE_NAME, UPDATE_DECLARATION } from 'duck'

export default function makeReduxStackblitzUpdateReconciler(doUpdate) {
  const debounceSlow = debounce(doUpdate, 500)

  return ({ action }) => setTimeout(() => {
    switch (action.type) {
      // do nothing
      case OPEN_API_INPUT_SCREEN:
      case CHANGE_FILE: {
        return
      }

      // debounce
      case UPDATE_DECLARATION: // StyledComponent TextArea
      case UPDATE_NAME: {
        debounceSlow()
        return
      }

      default:
        doUpdate()
    }
  })
}
