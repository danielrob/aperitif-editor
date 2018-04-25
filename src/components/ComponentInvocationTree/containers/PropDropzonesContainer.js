
import React from 'react'
import { DropTarget } from 'react-dnd'
import { findDOMNode } from 'react-dom'
import { DraggableTypes } from 'constantz'

import { PropDropzones } from '../components'

class PropDropzonesContainer extends React.Component {
  render() {
    const { connectDropTarget, children } = this.props
    return (
      <PropDropzones
        innerRef={innerRef => connectDropTarget(findDOMNode(innerRef))}
        {...this.props}
      >
        {children}
      </PropDropzones>
    )
  }
}

const dropzoneTarget = {
  drop(props, monitor) {
    const { onClickAction, parentId, position } = props
    const { name } = monitor.getItem()
    onClickAction({ parentId, position, name })
  },
}

const collect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  dragItem: monitor.getItem(),
})

export default DropTarget(DraggableTypes.PROP, dropzoneTarget, collect)(PropDropzonesContainer)
