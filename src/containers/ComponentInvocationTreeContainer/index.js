import { connect } from 'react-redux'
import { createComponentBundle } from 'duck'
import { DropTarget, DragSource } from 'react-dnd'

import { DraggableTypes } from 'constantz'
import { compose } from 'utils'

import { ComponentInvocationTree } from './components'
import { makeGetInvocation } from './selectors'

/* connect */
const makeMapStateToProps = () => {
  const getInvocation = makeGetInvocation()
  return (state, props) => getInvocation(state, props)
}

const mapDispatchToProps = { createComponentBundle }

/* dnd */
// source
const propSource = {
  beginDrag(props) {
    return props
  },
  canDrag(props) {
    return !props.isRoot
  },
}

const sourceCollect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
})

// target
const dropzoneTarget = {}

const targetCollect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isSupremeOver: monitor.isOver(),
  dragItem: monitor.getItem(),
})

/* compose */
export default compose(
  connect(makeMapStateToProps, mapDispatchToProps),
  DragSource(DraggableTypes.COMPONENT_INVOCATION, propSource, sourceCollect),
  DropTarget(DraggableTypes.PROP, dropzoneTarget, targetCollect)
)(ComponentInvocationTree)
