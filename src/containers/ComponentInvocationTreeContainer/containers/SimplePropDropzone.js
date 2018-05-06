import T from 'prop-types'
import { forbidExtraProps } from 'airbnb-prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { DropTarget } from 'react-dnd'
import { findDOMNode } from 'react-dom'

import { compose } from 'utils'
import { DraggableTypes } from 'constantz'
import { addParamAsComponentInvocationChild } from 'duck'

import { CIDropzone } from '../components'

class SimplePropDropzone extends React.Component {
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
  addParamAsComponentInvocationChild,
}

/* dnd */
const dropzoneTarget = {
  drop(props, monitor) {
    const { addParamAsComponentInvocationChild, targetInvocationId, targetPosition } = props
    const { id: paramId } = monitor.getItem()
    addParamAsComponentInvocationChild({ targetInvocationId, targetPosition, paramId })
  },
}

const collect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
})

/* compose export */
export default compose(
  connect(null, mapDispatchToProps),
  DropTarget(DraggableTypes.PROP, dropzoneTarget, collect)
)(SimplePropDropzone)


/* propTypes */
SimplePropDropzone.propTypes = forbidExtraProps({
  // passed by parent
  targetInvocationId: T.number.isRequired,
  targetPosition: T.number.isRequired,
  children: T.node.isRequired,

  // connect
  addParamAsComponentInvocationChild: T.func.isRequired,

  // React Dnd
  connectDropTarget: T.func.isRequired,
  isOver: T.bool.isRequired,
})
