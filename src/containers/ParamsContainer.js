import { partition } from 'lodash'
import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { makeSelectSomeParams } from 'selectors'

class ParamsContainer extends React.Component {
  render() {
    const [spreadParams, params] = partition(this.props.params, p => p.isSpreadMember)
    return (
      <React.Fragment>
        {this.props.children(params, spreadParams)}
      </React.Fragment>
    )
  }
}

const makeMapStateToProps = () => {
  const selectParams = makeSelectSomeParams()
  return createStructuredSelector({
    params: selectParams,
  })
}

export default connect(makeMapStateToProps)(ParamsContainer)
