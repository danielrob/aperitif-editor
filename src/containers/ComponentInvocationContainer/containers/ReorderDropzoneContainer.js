import T from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { DropTarget } from 'react-dnd'
import { findDOMNode } from 'react-dom'

import { compose } from 'utils'
import { COMPONENT_INVOCATION } from 'constantz'
import { moveInvocation } from 'duck'

import { ReorderDropzone } from '../components'

class ReorderDropzoneContainer extends React.PureComponent {
  render() {
    const { connectDropTarget, ciDimensions, ...props } = this.props
    return (
      <ReorderDropzone
        innerRef={innerRef => connectDropTarget(findDOMNode(innerRef))}
        ciDimensions={ciDimensions}
        {...props}
      />
    )
  }
}

ReorderDropzoneContainer.propTypes = {
  // passed by parent
  targetInvocationId: T.number.isRequired,
  targetPosition: T.number.isRequired,
  parentId: T.number.isRequired,
  type: T.oneOf([COMPONENT_INVOCATION]).isRequired,

  // from dragItem via parent
  sourceInvocationId: T.number.isRequired,
  ciDimensions: T.shape({ clientWidth: T.number, clientHeight: T.number }).isRequired,
  depth: T.number.isRequired,

  // connect
  moveInvocation: T.func.isRequired,

  // React Dnd
  connectDropTarget: T.func.isRequired,
}


/* connect */
const mapDispatchToProps = { moveInvocation }

/* dnd */
const dropzoneTarget = {
  drop(props) {
    const {
      moveInvocation,
      sourceInvocationId,
      targetInvocationId,
      targetPosition,
      parentId,
    } = props
    moveInvocation({
      sourceParentId: parentId,
      sourceInvocationId,
      targetInvocationId,
      targetPosition,
    })
  },
}

const collect = connect => ({
  connectDropTarget: connect.dropTarget(),
})

/* compose export */
export default compose(
  connect(null, mapDispatchToProps),
  DropTarget(COMPONENT_INVOCATION, dropzoneTarget, collect)
)(ReorderDropzoneContainer)
