
import React from 'react'
import { connect } from 'react-redux'
import { DropTarget, DragSource } from 'react-dnd'
import { findDOMNode } from 'react-dom'

import { compose } from 'utils'
import { DraggableTypes } from 'constantz'
import { moveParamToSpread } from 'duck'

import { SpreadProps } from '../components'

class SpreadPropsContainer extends React.Component {
  render() {
    const { connectDropTarget, children } = this.props
    return (
      <SpreadProps
        innerRef={innerRef => connectDropTarget(findDOMNode(innerRef))}
        {...this.props}
      >
        {children}
      </SpreadProps>
    )
  }
}

/* connect */
const mapDispatchToProps = { moveParamToSpread }

/* dnd */
// source
const sourceSpec = {
  beginDrag(props) {
    return props
  },
}

const sourceCollect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
})

// target
const dropzoneTarget = {
  drop(props, monitor) {
    const { declarationId, moveParamToSpread } = props
    const { paramId } = monitor.getItem()
    moveParamToSpread({
      declarationId,
      paramId,
    })
  },
}

const targetCollect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  dragItem: monitor.getItem(),
})

/* compose export */
export default compose(
  connect(null, mapDispatchToProps),
  DragSource(DraggableTypes.PROPS_SPREAD, sourceSpec, sourceCollect),
  DropTarget(DraggableTypes.PROP, dropzoneTarget, targetCollect),
)(SpreadPropsContainer)

