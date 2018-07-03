import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { routerReducer, routerMiddleware } from 'react-router-redux'

import { spyMiddleware } from 'middleware'
import appReducer from 'duck'

// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = (typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)
  // eslint-disable-next-line no-underscore-dangle
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ shouldHotReload: false })
  : compose


export default function configureStore(history) {
  const middleware = applyMiddleware(routerMiddleware(history), spyMiddleware)
  const enhancer = composeEnhancers(middleware)

  return createStore(
    combineReducers({
      app: appReducer,
      router: routerReducer,
    }),
    enhancer,
  )
}

