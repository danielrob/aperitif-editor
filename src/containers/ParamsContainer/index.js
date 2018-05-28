import { partition } from 'lodash'
import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import selectSomeParamsTransformed from './selectSomeParamsTransformed'

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
const mapStateToProps = createStructuredSelector({
  params: selectSomeParamsTransformed,
})

export default connect(mapStateToProps)(ParamsContainer)
