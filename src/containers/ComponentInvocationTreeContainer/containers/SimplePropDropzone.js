
import React from 'react'
import { DropTarget } from 'react-dnd'
import { findDOMNode } from 'react-dom'
import { DraggableTypes } from 'constantz'

import { PropDropzone } from '../components'

class SimplePropDropzone extends React.Component {
  render() {
    const { connectDropTarget, children } = this.props
    return (
      <PropDropzone
        innerRef={innerRef => connectDropTarget(findDOMNode(innerRef))}
        {...this.props}
      >
        {children}
      </PropDropzone>
    )
  }
}

const dropzoneTarget = {
  drop() {},
}

const collect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  dragItem: monitor.getItem(),
})

export default DropTarget(DraggableTypes.PROP, dropzoneTarget, collect)(SimplePropDropzone)

