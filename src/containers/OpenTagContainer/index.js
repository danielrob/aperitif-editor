import T from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { DropTarget } from 'react-dnd'
import { findDOMNode } from 'react-dom'

import { addAttributeToComponentInvocation, addPropsSpreadToComponentInvocation } from 'duck'
import { DraggableTypes } from 'constantz'
import { compose } from 'utils'

import { canDropPropToOpenTag } from './helpers'
import { OpenTag } from './components'

class OpenTagContainer extends React.Component {
  render() {
    const {
      connectDropTarget,
      name,
      callParams,
      closed,
      hasPropsSpread,
      depth,
      dragItem,
      isOverOpenTag,
      pseudoSpreadPropsName,
    } = this.props

    return (
      <OpenTag
        innerRef={innerRef => connectDropTarget(findDOMNode(innerRef))}
        name={name}
        callParams={callParams}
        closed={closed}
        hasPropsSpread={hasPropsSpread}
        pseudoSpreadPropsName={pseudoSpreadPropsName}
        depth={depth}
        dragItem={dragItem}
        isOverOpenTag={isOverOpenTag}
      />
    )
  }
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
    const { callParams } = props
    return canDropPropToOpenTag(callParams, monitor.getItem())
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

/* propTypes */
OpenTagContainer.propTypes = {
  name: T.string.isRequired,
  callParams: T.arrayOf(T.shape({
    id: T.number.isRequired,
    name: T.string.isRequired,
    declIsSpreadMember: T.bool,
    valueString: T.string,
  })).isRequired,
  closed: T.bool.isRequired,
  hasPropsSpread: T.bool.isRequired,
  pseudoSpreadPropsName: T.string,
  depth: T.number.isRequired,
  // ...spread - see ComponentInvocationTree

  // Injected by connect:
  addAttributeToComponentInvocation: T.func.isRequired,
  addPropsSpreadToComponentInvocation: T.func.isRequired,

  // Injected by React DnD:
  connectDropTarget: T.func.isRequired,
  isOverOpenTag: T.bool.isRequired,
  dragItem: T.shape({ type: T.string }).isRequired,
}

OpenTagContainer.defaultProps = {
  pseudoSpreadPropsName: null,
}
