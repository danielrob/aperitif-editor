import T from 'prop-types'
import { forbidExtraProps } from 'airbnb-prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { DropTarget } from 'react-dnd'
import { findDOMNode } from 'react-dom'

import { compose } from 'utils'
import { FILE, DIR } from 'constantz'
import { addInvocationFromFileToCI } from 'duck'

import { PropDropzone } from '../components'

class AddInvocationFromFileDropzone extends React.Component {
  render() {
    const { connectDropTarget, isOver, children } = this.props
    return (
      <PropDropzone
        innerRef={innerRef => connectDropTarget(findDOMNode(innerRef))}
        isOver={isOver}
      >
        {children}
      </PropDropzone>
    )
  }
}

AddInvocationFromFileDropzone.propTypes = forbidExtraProps({
  // passed by parent
  targetInvocationId: T.number.isRequired,
  targetPosition: T.number.isRequired,
  children: T.node.isRequired,

  // mapDispatchToProps
  addInvocationFromFileToCI: T.func.isRequired,

  // Injected by React DnD:
  connectDropTarget: T.func.isRequired,
  isOver: T.bool.isRequired,
})


/* connect */
const mapDispatchToProps = {
  addInvocationFromFileToCI,
}

/* dnd */
const dropzoneTarget = {
  drop(props, monitor) {
    const { addInvocationFromFileToCI, targetInvocationId, targetPosition } = props
    const { fileId, isDirectory } = monitor.getItem()

    console.log('CIdropzones', monitor.didDrop())

    addInvocationFromFileToCI({ targetInvocationId, targetPosition, fileId, isDirectory })
  },
}

const collect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
})

/* compose export */
export default compose(
  connect(null, mapDispatchToProps),
  DropTarget([FILE, DIR], dropzoneTarget, collect)
)(AddInvocationFromFileDropzone)

