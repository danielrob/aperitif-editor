import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import { Switch, Route } from 'react-router-dom'
import styled from 'styled-components'

import { Header, Footer, Workspace } from 'components'
import { WelcomePage, NotFoundPage } from 'containers'

const AppWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
`

export default class App extends Component {
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

