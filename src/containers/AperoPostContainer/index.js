import React from 'react'
import { connect } from 'react-redux'
import { ActionCreators as UndoActionCreators } from 'redux-undo'

import { initializeApp, newContainerPlease } from 'duck'

import AperoPost from './AperoPost'

class AperoPostContainer extends React.PureComponent {
  render() {
    return <AperoPost {...this.props} />
  }
}

const mapDispatchToProps = {
  initializeApp,
  newContainerPlease,
  undo: UndoActionCreators.undo,
}

export default connect(null, mapDispatchToProps)(AperoPostContainer)
