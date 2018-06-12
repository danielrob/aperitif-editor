import T from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { DropTarget } from 'react-dnd'
import { findDOMNode } from 'react-dom'

import { invocationPropTypes } from 'model-prop-types'
import { addAttributeToComponentInvocation, addPropsSpreadToComponentInvocation } from 'duck'
import { DraggableTypes } from 'constantz'
import { compose } from 'utils'

import { OpenTag, canDropPropToOpenTag } from '../components'

class OpenTagContainer extends React.Component {
  render() {
    const {
      connectDropTarget,
      dragItem,
      isOverOpenTag,
      depth,
      invocation,
    } = this.props

    return (
      <OpenTag
        innerRef={innerRef => connectDropTarget(findDOMNode(innerRef))}
        depth={depth}
        dragItem={dragItem}
        isOverOpenTag={isOverOpenTag}
        invocation={invocation}
      />
    )
  }
}


OpenTagContainer.propTypes = {
  depth: T.number.isRequired,

  invocation: invocationPropTypes.isRequired,

  // Injected by connect:
  addAttributeToComponentInvocation: T.func.isRequired,
  addPropsSpreadToComponentInvocation: T.func.isRequired,

  // Injected by React DnD:
  connectDropTarget: T.func.isRequired,
  isOverOpenTag: T.bool.isRequired,
  dragItem: T.shape({ type: T.string }).isRequired,
}


/* connect */
const mapDispatchToProps = {
  addAttributeToComponentInvocation,
  addPropsSpreadToComponentInvocation,
}

/* dnd */
const dropzoneTarget = {
  drop(props, monitor) {
    switch (monitor.getItemType()) {
      case DraggableTypes.PROP: {
        const { invocationId: targetInvocationId, addAttributeToComponentInvocation } = props
        return addAttributeToComponentInvocation({ targetInvocationId, prop: monitor.getItem() })
      }
      case DraggableTypes.PROPS_SPREAD: {
        const { invocationId, addPropsSpreadToComponentInvocation } = props
        return addPropsSpreadToComponentInvocation({ invocationId })
      }
      default:
    }
  },

  canDrop(props, monitor) {
    const { callParams, pseudoSpreadPropsName } = props
    return canDropPropToOpenTag(callParams, pseudoSpreadPropsName, monitor.getItem())
  },
}

const collect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOverOpenTag: monitor.isOver(),
  dragItem: {
    ...monitor.getItem(),
    type: monitor.getItemType(),
  },
})

/* compose export */
export default compose(
  connect(null, mapDispatchToProps),
  DropTarget([
    DraggableTypes.PROP,
    DraggableTypes.PROPS_SPREAD,
  ], dropzoneTarget, collect)
)(OpenTagContainer)

