
import React from 'react'
import { DropTarget } from 'react-dnd'
import { findDOMNode } from 'react-dom'
import { DraggableTypes } from 'constantz'

import { OpenTag } from '../components'

class OpenTagContainer extends React.Component {
  render() {
    const { connectDropTarget, children } = this.props
    return (
      <OpenTag
        innerRef={innerRef => connectDropTarget(findDOMNode(innerRef))}
        {...this.props}
      >
        {children}
      </OpenTag>
    )
  }
}

const dropzoneTarget = {
  hover(props, monitor) {
    console.log('hovering open tag')
  },
}

const collect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  dragItem: monitor.getItem(),
})

export default DropTarget(DraggableTypes.PROP, dropzoneTarget, collect)(OpenTagContainer)
