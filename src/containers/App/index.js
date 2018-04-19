import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import { Switch, Route } from 'react-router-dom'

import { Header, Footer, Workspace } from 'components'
import { WelcomePage, NotFoundPage } from 'containers'

import AppWrapper from './AppWrapper'

class App extends Component {
  render() {
    return (
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
    )
  }
}

export default App
