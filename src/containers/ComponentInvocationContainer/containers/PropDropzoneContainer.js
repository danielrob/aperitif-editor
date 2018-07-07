import T from 'prop-types'
import { forbidExtraProps } from 'airbnb-prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { DropTarget } from 'react-dnd'
import { findDOMNode } from 'react-dom'

import { compose } from 'utils'
import { PROP, PARAM_INVOCATION, REACT_CHILDREN_INVOCATION_ID } from 'constantz'
import {
  addParamAsComponentInvocationChild,
  addNewComponentToInvocationWithMap,
  addNewComponentToInvocationWithSpread,
  addNewComponentToInvocationWithAttribute,
  addNewComponentToInvocationWithChildren,
  addNewStyledComponentToInvocation,
  addNewStyledUrlToInvocation,
  moveInvocation,
} from 'duck'

import { PropDropzone } from '../components'

class PropDropzoneContainer extends React.PureComponent {
  render() {
    const { connectDropTarget, isOver, children } = this.props
    return (
      <PropDropzone innerRef={innerRef => connectDropTarget(findDOMNode(innerRef))} isOver={isOver}>
        {children}
      </PropDropzone>
    )
  }
}

const dropActionMap = {
  asParamInvocation: 'addParamAsComponentInvocationChild',
  newWithSpread: 'addNewComponentToInvocationWithSpread',
  newWithMap: 'addNewComponentToInvocationWithMap',
  newWithAttribute: 'addNewComponentToInvocationWithAttribute',
  newWithChild: 'addNewComponentToInvocationWithChildren',
  newStyled: 'addNewStyledComponentToInvocation',
  newStyledUrl: 'addNewStyledUrlToInvocation',
}

PropDropzoneContainer.propTypes = forbidExtraProps({
  // passed by parent
  targetInvocationId: T.number.isRequired,
  targetPosition: T.number.isRequired,
  children: T.node.isRequired,
  dropActionKey: T.oneOf(Object.keys(dropActionMap)),

  // connect
  addParamAsComponentInvocationChild: T.func.isRequired,
  addNewComponentToInvocationWithMap: T.func.isRequired,
  addNewComponentToInvocationWithSpread: T.func.isRequired,
  addNewComponentToInvocationWithAttribute: T.func.isRequired,
  addNewComponentToInvocationWithChildren: T.func.isRequired,
  addNewStyledComponentToInvocation: T.func.isRequired,
  addNewStyledUrlToInvocation: T.func.isRequired,
  moveInvocation: T.func.isRequired,

  // React Dnd
  connectDropTarget: T.func.isRequired,
  isOver: T.bool.isRequired,
})

PropDropzoneContainer.defaultProps = {
  dropActionKey: null,
}


/* connect */
const mapDispatchToProps = {
  addParamAsComponentInvocationChild,
  addNewComponentToInvocationWithMap,
  addNewComponentToInvocationWithSpread,
  addNewComponentToInvocationWithAttribute,
  addNewComponentToInvocationWithChildren,
  addNewStyledComponentToInvocation,
  addNewStyledUrlToInvocation,
  moveInvocation,
}

/* dnd */
const dropzoneTarget = {
  drop(props, monitor) {
    switch (monitor.getItemType()) {
      case PROP: {
        const { dropActionKey, targetInvocationId, targetPosition } = props
        const prop = monitor.getItem()

        return props[dropActionMap[dropActionKey]]({ targetInvocationId, targetPosition, prop })
      }

      case PARAM_INVOCATION: {
        const { moveInvocation, targetInvocationId, targetPosition } = props
        const { sourceParentId, sourceInvocationId } = monitor.getItem()
        return moveInvocation({
          sourceParentId,
          sourceInvocationId,
          targetInvocationId,
          targetPosition,
        })
      }
      default:
    }
  },
  canDrop(props, monitor) {
    const { targetInvocationId } = props
    const item = monitor.getItem()

    // Throw together for disabling moving {children} outside of it's parent invocation.
    return !(
      monitor.getItemType() === PARAM_INVOCATION &&
      item.callParamId === REACT_CHILDREN_INVOCATION_ID &&
      item.sourceParentId !== targetInvocationId
    )
  },
}

const collect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
})

/* compose export */
export default compose(
  connect(null, mapDispatchToProps),
  DropTarget([PROP, PARAM_INVOCATION], dropzoneTarget, collect)
)(PropDropzoneContainer)
