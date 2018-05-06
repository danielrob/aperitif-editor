import React from 'react'
import { connect } from 'react-redux'
import { DropTarget } from 'react-dnd'
import { findDOMNode } from 'react-dom'

import { compose } from 'utils'
import { FILE, DIR } from 'constantz'
import { addInvocationFromFileToCI } from 'duck'

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
  addInvocationFromFileToCI,
}

/* dnd */
const dropzoneTarget = {
  drop(props, monitor) {
    const { id: cIId, addInvocationFromFileToCI, position } = props
    addInvocationFromFileToCI({ cIId, position, item: monitor.getItem() })
  },
}

const collect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  dragItem: monitor.getItem(),
})

/* compose export */
export default compose(
  connect(null, mapDispatchToProps),
  DropTarget([FILE, DIR], dropzoneTarget, collect)
)(AddInvocationFromFileDropzone)

