
import React from 'react'
import { DropTarget } from 'react-dnd'
import { findDOMNode } from 'react-dom'
import { DraggableTypes } from 'constantz'

import { PropDropzones } from '../components'

class PropDropzonesContainer extends React.Component {
  render() {
    const { connectDropTarget } = this.props
    return (
      <PropDropzones
        innerRef={innerRef => connectDropTarget(findDOMNode(innerRef))}
        {...this.props}
      />
    )
  }
}

/* dnd */
const dropzoneTarget = {

}

const collect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOverDropZones: monitor.isOver(),
})

/* export */
export default DropTarget(DraggableTypes.PROP, dropzoneTarget, collect)(PropDropzonesContainer)
