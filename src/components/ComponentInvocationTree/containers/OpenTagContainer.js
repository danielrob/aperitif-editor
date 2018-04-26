import React from 'react'
import { connect } from 'react-redux'
import { DropTarget } from 'react-dnd'
import { findDOMNode } from 'react-dom'

import { addParamToComponentInvocation } from 'duck'
import { DraggableTypes } from 'constantz'
import { compose } from 'utils'

import { OpenTag } from '../components'

class OpenTagContainer extends React.Component {
  render() {
    const { connectDropTarget } = this.props
    return (
      <OpenTag innerRef={innerRef => connectDropTarget(findDOMNode(innerRef))} {...this.props} />
    )
  }
}

const dropzoneTarget = {
  drop(props, monitor) {
    const { id: parentId, addParamToComponentInvocation } = props
    addParamToComponentInvocation({ parentId, item: monitor.getItem() })
  },

  canDrop(props, monitor) {
    const { paramIds } = props
    const { id: itemId } = monitor.getItem()
    return !paramIds.includes(itemId)
  },
}

const collect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  dragItem: monitor.getItem(),
})

const mapDispatchToProps = {
  addParamToComponentInvocation,
}

export default compose(
  connect(null, mapDispatchToProps),
  DropTarget(DraggableTypes.PROP, dropzoneTarget, collect),
)(OpenTagContainer)
