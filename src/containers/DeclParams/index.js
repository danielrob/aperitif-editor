import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import makeSelectDeclParams from './makeSelectDeclParams'

class DeclParams extends React.PureComponent {
  render() {
    const { render, params } = this.props
    return render(params)
  }
}

const makeMapStateToProps = () => {
  const selectDeclParams = makeSelectDeclParams()
  return createStructuredSelector({
    params: selectDeclParams,
  })
}

export default connect(
  makeMapStateToProps,
  null
)(DeclParams)
