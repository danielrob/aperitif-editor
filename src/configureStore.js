import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { routerReducer, routerMiddleware } from 'react-router-redux'
import { save as makeSaver, load as makeLoader } from 'redux-localstorage-simple'

import { spyMiddleware } from 'middleware'
import appReducer from 'duck'

const save = makeSaver({ debounce: 1000 }) // middleware

// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = (typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)
  // eslint-disable-next-line no-underscore-dangle
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ shouldHotReload: false })
  : compose

export default function configureStore(history) {
  const middleware = applyMiddleware(routerMiddleware(history), spyMiddleware, save)
  const enhancer = composeEnhancers(middleware)

  return createStore(
    combineReducers({
      app: appReducer,
      router: routerReducer,
    }),
    makeLoader(),
    enhancer,
  )
}
