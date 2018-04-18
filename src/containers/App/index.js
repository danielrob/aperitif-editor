import React, { Component } from 'react'

import AppWrapper from './AppWrapper'

class App extends Component {
  render() {
    return (
      <AppWrapper>
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>app/App.js</code> and save to reload.
        </p>
      </AppWrapper>
    )
  }
}

export default App
