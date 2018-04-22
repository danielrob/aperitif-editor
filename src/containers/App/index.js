import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import { Switch, Route } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'

import { Header, Footer, Workspace } from 'components'
import { WelcomePage, NotFoundPage } from 'containers'
import defaultTheme from 'themes'

import AppWrapper from './AppWrapper'

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={defaultTheme}>
        <AppWrapper>
          <Helmet titleTemplate="%s - r-apide" defaultTitle="r-apide">
            <meta name="description" content="R-apide" />
          </Helmet>
          <Header />
          <Switch>
            <Route exact path="/" component={WelcomePage} />
            <Route path="/editor" component={Workspace} />
            <Route path="" component={NotFoundPage} />
          </Switch>
          <Footer />
        </AppWrapper>
      </ThemeProvider>
    )
  }
}

export default App
