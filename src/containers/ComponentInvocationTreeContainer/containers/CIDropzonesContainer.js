
import React from 'react'
import { DropTarget } from 'react-dnd'
import { findDOMNode } from 'react-dom'
import { DraggableTypes } from 'constantz'

import { CIDropzones } from '../components'

class CIDropzonesContainer extends React.Component {
  render() {
    const { connectDropTarget } = this.props
    return (
      <CIDropzones
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
export default DropTarget(DraggableTypes.PROP, dropzoneTarget, collect)(CIDropzonesContainer)
