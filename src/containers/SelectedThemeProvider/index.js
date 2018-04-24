import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ThemeProvider } from 'styled-components'

import defaultTheme from './themes'

class SelectedThemeProvider extends Component {
  shouldComponentUpdate() {
    return false // only default theme for now
  }

  render() {
    return (
      <ThemeProvider theme={this.props.theme}>
        {this.props.children}
      </ThemeProvider>
    )
  }
}

const mapStateToProps = () => ({ theme: defaultTheme })

export default connect(mapStateToProps)(SelectedThemeProvider)
