import React from 'react'
import { connect } from 'react-redux'
import { createComponentBundle } from 'duck'
import { DropTarget, DragSource } from 'react-dnd'

import { DraggableTypes, PROP, FILE } from 'constantz'
import { compose } from 'utils'

import { ComponentInvocationTree } from './components'
import { makeGetInvocation } from './selectors'

class ComponentInvocationTreeContainer extends React.Component {
  render() {
    const { connectDragSource, isDragging, ...props } = this.props
    const { isOverCIT1, isOverCIT2 } = props

    return !isDragging ? connectDragSource(
      <div>
        <ComponentInvocationTree {...props} isOverCI={isOverCIT1 || isOverCIT2} />
      </div>
    ) : null
  }
}

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
    return props.depth !== 1
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
  isOverCIT1: monitor.isOver(),
  dragItem: monitor.getItem(),
})

const targetTwoCollect = (connect, monitor) => ({
  connectClosingDropTarget: connect.dropTarget(),
  isOverCIT2: monitor.isOver(),
  dragItem: monitor.getItem(),
})

/* compose */
export default compose(
  connect(makeMapStateToProps, mapDispatchToProps),
  DragSource(DraggableTypes.COMPONENT_INVOCATION, propSource, sourceCollect),
  DropTarget([PROP, FILE], dropzoneTarget, targetCollect),
  DropTarget([PROP, FILE], dropzoneTarget, targetTwoCollect)
)(ComponentInvocationTreeContainer)
