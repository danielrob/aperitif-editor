
import React from 'react'
import { connect } from 'react-redux'
import { DropTarget } from 'react-dnd'
import { findDOMNode } from 'react-dom'

import { DraggableTypes } from 'constantz'
import { createComponentBundle } from 'duck'

import { PropDropzone } from '../components'

class NewWithPropAsChildPropDropzone extends React.Component {
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

  drop(props, monitor) {
    const { parentId, newWithPropAsChild, position } = props
    newWithPropAsChild({ parentId, position, item: monitor.getItem() })
  },
}

const collect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  dragItem: monitor.getItem(),
})

const mapDispatchToProps = {
  newWithPropAsChild: createComponentBundle,
}

export default connect(null, mapDispatchToProps)(
  DropTarget(DraggableTypes.PROP, dropzoneTarget, collect)(
    NewWithPropAsChildPropDropzone
  )
)

