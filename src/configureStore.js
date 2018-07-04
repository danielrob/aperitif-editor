import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { routerReducer, routerMiddleware } from 'react-router-redux'
import persistState from 'redux-localstorage'

import { spyMiddleware } from 'middleware'
import appReducer from 'duck'

// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = (typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)
  // eslint-disable-next-line no-underscore-dangle
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ shouldHotReload: false })
  : compose


export default function configureStore(history) {
  const middleware = applyMiddleware(routerMiddleware(history), spyMiddleware)
  const enhancer = composeEnhancers(middleware, persistState(undefined, persistConfig))

  return createStore(
    combineReducers({
      app: appReducer,
      router: routerReducer,
    }),
    enhancer,
  )
}

const persistSlicer = () => ({ app: { present }, ...state }) => ({
  ...state,
  app: present, // { present } - nope, undoable appears to reinitialize without past/future/etc keys
})

const persistConfig = {
  slicer: persistSlicer,
}
