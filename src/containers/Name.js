import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { makeSelectName } from 'selectors'

class Name extends React.PureComponent {
  render() {
    const { render, name: { value } = {} } = this.props
    return render ? render(value) : value || null
  }
}

const makeMapStateToProps = () => {
  const selectName = makeSelectName()
  return createStructuredSelector({
    name: selectName,
  })
}

export default connect(
  makeMapStateToProps,
  null
)(Name)
