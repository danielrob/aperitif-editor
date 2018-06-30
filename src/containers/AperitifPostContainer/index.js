import React from 'react'
import { connect } from 'react-redux'
import { ActionCreators as UndoActionCreators } from 'redux-undo'

import { initializeApp, newContainerPlease } from 'duck'

import AperitifPost from './AperitifPost'

class AperitifPostContainer extends React.PureComponent {
  render() {
    return <AperitifPost {...this.props} />
  }
}

const mapDispatchToProps = {
  initializeApp,
  newContainerPlease,
  undo: UndoActionCreators.undo,
}

export default connect(null, mapDispatchToProps)(AperitifPostContainer)
