import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import { Switch, Route } from 'react-router-dom'
import styled from 'styled-components'

import { NotFoundPage, WorkspaceContainer } from 'containers'

export default class App extends Component {
  render() {
    return (
      <AppWrapper>
        <Helmet titleTemplate="%s - Aperitif" defaultTitle="Aperitif">
          <meta name="description" content="Aperitif - A React Editor" />
        </Helmet>
        <Switch>
          <Route exact path="/" component={WorkspaceContainer} />
          <Route path="" component={NotFoundPage} />
        </Switch>
      </AppWrapper>
    )
  }
}

const AppWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
`
