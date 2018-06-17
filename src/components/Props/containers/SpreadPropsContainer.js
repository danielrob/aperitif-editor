
import React from 'react'
import { connect } from 'react-redux'
import { DropTarget, DragSource } from 'react-dnd'
import { findDOMNode } from 'react-dom'
import { createStructuredSelector } from 'reselect'

import { compose } from 'utils'
import { DraggableTypes } from 'constantz'
import { moveParamToSpread } from 'duck'
import { selectNames } from 'selectors'

import { SpreadProps } from '../components'

class SpreadPropsContainer extends React.PureComponent {
  render() {
    const { connectDropTarget } = this.props
    return (
      <SpreadProps
        innerRef={innerRef => connectDropTarget(findDOMNode(innerRef))}
        {...this.props}
      />
    )
  }
}

/* connect */
const mapDispatchToProps = { moveParamToSpread }

const mapStateToProps = createStructuredSelector({
  names: selectNames,
})

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
  connect(mapStateToProps, mapDispatchToProps),
  DragSource(DraggableTypes.PROPS_SPREAD, sourceSpec, sourceCollect),
  DropTarget(DraggableTypes.PROP, dropzoneTarget, targetCollect),
)(SpreadPropsContainer)

