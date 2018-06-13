import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { makeSelectDeclaration } from 'selectors'

class DeclarationContainer extends React.Component {
  render() {
    return (
      <React.Fragment>
        {this.props.render(this.props.declaration)}
      </React.Fragment>
    )
  }
}

const makeMapStateToProps = () => {
  const selectDeclaration = makeSelectDeclaration()
  return createStructuredSelector({
    declaration: selectDeclaration,
  })
}

export default connect(makeMapStateToProps)(DeclarationContainer)
