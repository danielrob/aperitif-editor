
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
  hover(props, monitor) {
    console.log('hovering opensdfsdfsfsftag')
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

export default DropTarget(DraggableTypes.PROP, dropzoneTarget, collect)(PropDropzonesContainer)
