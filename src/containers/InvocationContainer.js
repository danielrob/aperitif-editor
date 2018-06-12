import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { selectInvocation } from 'selectors'

class InvocationContainer extends React.Component {
  render() {
    return this.props.render(this.props.invocation)
  }
}

export default connect(
  createStructuredSelector({ invocation: selectInvocation }),
  null
)(InvocationContainer)
