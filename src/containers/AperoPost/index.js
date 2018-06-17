import React from 'react'
import { connect } from 'react-redux'

import { initializeApp } from 'duck'

import AperoPost from './AperoPost'

class AperoPostContainer extends React.PureComponent {
  render() {
    return <AperoPost {...this.props} />
  }
}

const mapDispatchToProps = {
  initializeApp,
}

export default connect(null, mapDispatchToProps)(AperoPostContainer)
