import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { createComponentBundle } from 'duck'
import { DropTarget } from 'react-dnd'

import { ComponentInvocationTree } from 'components'
import { DraggableTypes } from 'constantz'

import { makeGetInvocation } from './selectors'

const makeMapStateToProps = () => {
  const getInvocation = makeGetInvocation()
  return (state, props) => getInvocation(state, props)
}

const mapDispatchToProps = dispatch => bindActionCreators({ createComponentBundle }, dispatch)

const ComponentInvocationTreeContainer = connect(makeMapStateToProps, mapDispatchToProps)(
  ComponentInvocationTree
)

const dropzoneTarget = {
  hover(props, monitor) {
    console.log('ekrekjrhekjh')
  },
  canDrop() {
    return false
  }
}

const collect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  dragItem: monitor.getItem(),
})

export default DropTarget(DraggableTypes.PROP, dropzoneTarget, collect)(ComponentInvocationTreeContainer)
