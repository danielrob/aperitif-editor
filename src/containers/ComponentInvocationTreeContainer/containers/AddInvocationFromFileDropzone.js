
import React from 'react'
import { connect } from 'react-redux'
import { DropTarget } from 'react-dnd'
import { findDOMNode } from 'react-dom'

import { compose } from 'utils'
import { DraggableTypes } from 'constantz'
import { createComponentBundle } from 'duck'

import { CIDropzone } from '../components'

class AddInvocationFromFileDropzone extends React.Component {
  render() {
    const { connectDropTarget, children } = this.props
    return (
      <CIDropzone
        innerRef={innerRef => connectDropTarget(findDOMNode(innerRef))}
        {...this.props}
      >
        {children}
      </CIDropzone>
    )
  }
}

/* connect */
const mapDispatchToProps = {
  newWithPropAsChild: createComponentBundle,
}

/* dnd */
const dropzoneTarget = {
  drop(props, monitor) {
    const { id: parentId, newWithPropAsChild, position } = props
    newWithPropAsChild({ parentId, position, item: monitor.getItem(), propAsChild: true })
  },
}

const collect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  dragItem: monitor.getItem(),
})

/* compose */
export default compose(
  connect(null, mapDispatchToProps),
  DropTarget(DraggableTypes.FILE, dropzoneTarget, collect)
)(AddInvocationFromFileDropzone)

