import T from 'prop-types'
import C from 'check-types'
import { forbidExtraProps } from 'airbnb-prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { DropTarget, DragSource } from 'react-dnd'

import { invocationPropTypes } from 'model-prop-types'
import { COMPONENT_INVOCATION } from 'constantz'
import { compose } from 'utils'

import { acceptedDropTypes, getIsValidOver } from './helpers'
import { ComponentInvocation } from './components'
import getCIDimensionsInjector from './getCIDimensionsInjector'
import makeSelectInvocation from './makeSelectInvocation'

class ComponentInvocationContainer extends React.PureComponent {
  render() {
    const {
      connectDragSource,
      componentInvocationRef,
      isDragging,
      parentIsInline,
      invocation: { closed, inline, ...invocation },
      invocationId, // selector / dnd only
      parentId, // dnd only
      ciDimensions, // dnd only
      ...props
    } = this.props

    const { isOverCIT1, isOverCIT2 } = props
    const isOverCI = isOverCIT1 || isOverCIT2
    const isClosed = closed && (!isOverCI || C.boolean(props.dragItem.payload))
    const displayInline = (parentIsInline || inline) && !isOverCI

    // https://github.com/react-dnd/react-dnd/issues/998
    return !isDragging ? connectDragSource(
      <div>
        <div ref={componentInvocationRef} style={{ display: 'table', width: 'auto' }}>
          <ComponentInvocation
            {...props}
            isOverCI={isOverCI}
            invocation={{
              closed: isClosed,
              inline: displayInline,
              ...invocation,
            }}
          />
        </div>
      </div>
    ) : null
  }
}

ComponentInvocationContainer.propTypes = forbidExtraProps({
  // passed by parent
  invocationId: T.number.isRequired,
  initial: T.bool,
  depth: T.number.isRequired,
  parentId: T.number,
  parentIsInline: T.bool,

  // connect
  invocation: invocationPropTypes.isRequired,

  // getCIDimensionsInjector
  componentInvocationRef: T.shape({ current: T.any }).isRequired,
  ciDimensions: T.shape({ clientWidth: T.number, clientHeight: T.number }).isRequired,

  // DragSource
  connectDragSource: T.func.isRequired,
  isDragging: T.bool,

  // DragTarget 1
  connectDropTarget: T.func.isRequired,
  isOverCIT1: T.bool.isRequired,
  dragItem: T.shape({ name: T.string }),

  // DragTarget 2
  connectClosingDropTarget: T.func.isRequired,
  isOverCIT2: T.bool.isRequired,

})

ComponentInvocationContainer.defaultProps = {
  parentId: null,
  initial: false,
  dragItem: null,
  isDragging: false,
  parentIsInline: false,
}

/* connect */
const makeMapStateToProps = () => {
  const getInvocation = makeSelectInvocation()
  return (state, props) => ({
    invocation: getInvocation(state, props),
  })
}

const mapDispatchToProps = { }

/* dnd */
// source
const propSource = {
  beginDrag(props) {
    const { invocationId, ciDimensions, depth, parentId } = props
    return {
      type: COMPONENT_INVOCATION,
      sourceInvocationId: invocationId,
      sourceParentId: parentId,
      ciDimensions,
      depth,
      parentId,
    }
  },
  canDrag(props) {
    return !props.initial
  },
}

const sourceCollect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
})

// target
const dropzoneTarget = {}

const targetCollect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOverCIT1: getIsValidOver(monitor),
  dragItem: monitor.getItem(),
})

const targetTwoCollect = (connect, monitor) => ({
  connectClosingDropTarget: connect.dropTarget(),
  isOverCIT2: getIsValidOver(monitor),
})

/* compose export */
export default compose(
  connect(makeMapStateToProps, mapDispatchToProps),
  getCIDimensionsInjector,
  DragSource(COMPONENT_INVOCATION, propSource, sourceCollect),
  DropTarget(acceptedDropTypes, dropzoneTarget, targetCollect),
  DropTarget(acceptedDropTypes, dropzoneTarget, targetTwoCollect)
)(ComponentInvocationContainer)
