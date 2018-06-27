import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { changeName } from 'duck'

import { makeSelectName } from 'selectors'

class Name extends React.PureComponent {
  render() {
    const { render, name: { value } = {}, changeName } = this.props
    return render ? render(value, changeName) : value || null
  }
}

const mapDispatchToProps = { changeName }

const makeMapStateToProps = () => {
  const selectName = makeSelectName()
  return createStructuredSelector({
    name: selectName,
  })
}

export default connect(
  makeMapStateToProps,
  mapDispatchToProps
)(Name)
