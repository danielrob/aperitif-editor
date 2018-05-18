import T from 'prop-types'
import { forbidExtraProps } from 'airbnb-prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { DropTarget } from 'react-dnd'
import { findDOMNode } from 'react-dom'

import { compose } from 'utils'
import { DraggableTypes } from 'constantz'
import { addNewComponentToInvocationWithAttribute } from 'duck'

import { CIDropzone } from '../components'

class NewWithPropDropzone extends React.Component {
  render() {
    const { connectDropTarget, isOver, children } = this.props
    return (
      <CIDropzone
        innerRef={innerRef => connectDropTarget(findDOMNode(innerRef))}
        isOver={isOver}
      >
        {children}
      </CIDropzone>
    )
  }
}

/* connect */
const mapDispatchToProps = {
  addNewComponentToInvocationWithAttribute,
}

/* dnd */
const dropzoneTarget = {
  drop(props, monitor) {
    const { addNewComponentToInvocationWithAttribute, targetInvocationId, targetPosition } = props
    const prop = monitor.getItem()

    addNewComponentToInvocationWithAttribute({ targetInvocationId, targetPosition, prop })
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
)(NewWithPropDropzone)


/* propTypes */
NewWithPropDropzone.propTypes = forbidExtraProps({
  // passed by parent
  targetInvocationId: T.number.isRequired,
  targetPosition: T.number.isRequired,
  children: T.node.isRequired,

  // mapDispatchToProps
  addNewComponentToInvocationWithAttribute: T.func.isRequired,

  // Injected by React DnD:
  connectDropTarget: T.func.isRequired,
  isOver: T.bool.isRequired,
})
