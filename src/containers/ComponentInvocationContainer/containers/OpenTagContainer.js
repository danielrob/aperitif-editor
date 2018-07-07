import T from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { DropTarget } from 'react-dnd'
import { findDOMNode } from 'react-dom'

import { invocationPropTypes } from 'model-prop-types'
import { addAttributeToComponentInvocation, addPropsSpreadToComponentInvocation, moveCallParam } from 'duck'
import { PROP, CALL_PARAM, PROPS_SPREAD } from 'constantz'
import { compose } from 'utils'

import { OpenTag, canDropPropToOpenTag, canDropCallParamToOpenTag } from '../components'

class OpenTagContainer extends React.PureComponent {
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


/*
  PropTypes
*/
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


/*
  connect
*/
const mapDispatchToProps = {
  addAttributeToComponentInvocation,
  addPropsSpreadToComponentInvocation,
  moveCallParam,
}


/*
  dnd - target
*/
const dropTypes = [PROP, PROPS_SPREAD, CALL_PARAM]

const dropzoneTarget = {
  drop(props, monitor) {
    const { invocation: { invocationId: targetInvocationId } } = props

    switch (monitor.getItemType()) {
      case PROP: {
        const { addAttributeToComponentInvocation } = props
        return addAttributeToComponentInvocation({ targetInvocationId, prop: monitor.getItem() })
      }
      case PROPS_SPREAD: {
        const { addPropsSpreadToComponentInvocation } = props
        return addPropsSpreadToComponentInvocation({ targetInvocationId })
      }
      case CALL_PARAM: {
        const { paramId, sourceInvocationId } = monitor.getItem()
        const { moveCallParam } = props
        return moveCallParam({ paramId, targetInvocationId, sourceInvocationId })
      }
      // no default
    }
  },

  canDrop(props, monitor) {
    const { invocation: { callParams, pseudoSpreadPropsName } } = props
    switch (monitor.getItemType()) {
      case PROP: {
        return canDropPropToOpenTag(callParams, pseudoSpreadPropsName, monitor.getItem())
      }
      case CALL_PARAM: {
        return canDropCallParamToOpenTag(callParams, monitor.getItem())
      }
      // no default
    }
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


/*
  compose export
*/
export default compose(
  connect(null, mapDispatchToProps),
  DropTarget(dropTypes, dropzoneTarget, collect)
)(OpenTagContainer)

