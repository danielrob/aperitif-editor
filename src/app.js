import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import { IntlProvider } from 'react-intl'
import createHistory from 'history/createBrowserHistory'
import 'sanitize.css/sanitize.css'
import getBrowserLocale from 'browser-locale'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

import { App, SelectedThemeProvider } from 'containers'

import registerServiceWorker from './registerServiceWorker'
import configureStore from './configureStore'
import { translationMessages } from './i18n'

import './global-styles'

const history = createHistory()
const MOUNT_NODE = document.getElementById('root')
const store = configureStore(history)

const locale = getBrowserLocale().substring(0, 2)

const AppWithDnDContext = DragDropContext(HTML5Backend)(App)

const render = (messages) => {
  ReactDOM.render(
    <Provider store={store}>
      <IntlProvider messages={messages[locale]} locale={locale} key={locale}>
        <ConnectedRouter history={history}>
          <SelectedThemeProvider>
            <AppWithDnDContext />
          </SelectedThemeProvider>
        </ConnectedRouter>
      </IntlProvider>
    </Provider>,
    MOUNT_NODE
  )
}

if (module.hot) {
  // Hot reloadable React components and translation json files
  // modules.hot.accept does not accept dynamic dependencies,
  // have to be constants at compile-time
  module.hot.accept(['./i18n', 'containers/App'], () => {
    ReactDOM.unmountComponentAtNode(MOUNT_NODE)
    render(translationMessages)
  })
}

render(translationMessages)
registerServiceWorker()
