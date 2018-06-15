import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { makeSelectInvocation } from 'selectors'

class InvocationContainer extends React.Component {
  render() {
    return this.props.render(this.props.invocation)
  }
}

const makeMapStateToProps = () => {
  const selectInvocation = makeSelectInvocation()
  return createStructuredSelector({
    invocation: selectInvocation,
  })
}

export default connect(
  makeMapStateToProps,
  null
)(InvocationContainer)
