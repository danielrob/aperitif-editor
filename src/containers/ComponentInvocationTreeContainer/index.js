import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { createComponentBundle } from 'duck'
import { ComponentInvocationTree } from 'components'

import { makeGetInvocation } from './selectors'

const makeMapStateToProps = () => {
  const getInvocation = makeGetInvocation()
  return (state, props) => getInvocation(state, props)
}

const mapDispatchToProps = dispatch => bindActionCreators({ createComponentBundle }, dispatch)

const ComponentInvocationTreeContainer = connect(makeMapStateToProps, mapDispatchToProps)(
  ComponentInvocationTree
)

export default ComponentInvocationTreeContainer
