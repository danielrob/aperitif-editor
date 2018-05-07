import React from 'react'
import { connect } from 'react-redux'
import { DropTarget } from 'react-dnd'
import { findDOMNode } from 'react-dom'

import { addAttributeToComponentInvocation, addPropsSpreadToComponentInvocation } from 'duck'
import { DraggableTypes } from 'constantz'
import { compose } from 'utils'

import { OpenTag } from '../components'

class OpenTagContainer extends React.Component {
  render() {
    const { connectDropTarget, ...props } = this.props
    return (
      <OpenTag
        innerRef={innerRef => connectDropTarget(findDOMNode(innerRef))}
        {...props}
      />
    )
  }
}

/* connect */
const mapDispatchToProps = {
  addAttributeToComponentInvocation,
  addPropsSpreadToComponentInvocation,
}

/* dnd */
const dropzoneTarget = {
  drop(props, monitor) {
    switch (monitor.getItemType()) {
      case DraggableTypes.PROP: {
        const { invocationId: parentId, addAttributeToComponentInvocation } = props
        return addAttributeToComponentInvocation({ parentId, item: monitor.getItem() })
      }
      case DraggableTypes.PROPS_SPREAD: {
        const { invocationId, addPropsSpreadToComponentInvocation } = props
        return addPropsSpreadToComponentInvocation({ invocationId })
      }
      default:
    }
  },

  canDrop(props, monitor) {
    const { paramIds } = props
    const { id: itemId } = monitor.getItem()
    return !paramIds.includes(itemId)
  },
}

const collect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOverOpenTag: monitor.isOver(),
  dragItem: {
    ...monitor.getItem(),
    type: monitor.getItemType(),
  },

})

/* compose export */
export default compose(
  connect(null, mapDispatchToProps),
  DropTarget([
    DraggableTypes.PROP,
    DraggableTypes.PROPS_SPREAD,
  ], dropzoneTarget, collect)
)(OpenTagContainer)
