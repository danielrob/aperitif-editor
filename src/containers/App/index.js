import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import { Switch, Route } from 'react-router-dom'
import styled from 'styled-components'
// import ReactTooltip from 'react-tooltip'

import { Header, Footer } from 'components'
import { WelcomePage, NotFoundPage, WorkspaceContainer } from 'containers'

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
        <Helmet titleTemplate="%s - Apéro" defaultTitle="Apéro">
          <meta name="description" content="React Apéro Editor" />
        </Helmet>
        <Header />
        <Switch>
          <Route exact path="/" component={WelcomePage} />
          <Route path="/editor" component={WorkspaceContainer} />
          <Route path="" component={NotFoundPage} />
        </Switch>
        <Footer />
        {/* <ReactTooltip
          id="prop"
          effect="solid"
          delayShow={100}
          // type="success"
          getContent={dataTip => <pre>{dataTip}</pre>}
        /> */}
      </AppWrapper>
    )
  }
}

