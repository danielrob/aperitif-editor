import T from 'prop-types'
import { forbidExtraProps } from 'airbnb-prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { DropTarget, DragSource } from 'react-dnd'
import { COMPONENT_INVOCATION, PARAM_INVOCATION } from 'constantz'
import { compose } from 'utils'

import { acceptedDropTypes, getIsValidOver } from './helpers'
import { ComponentInvocationTree } from './components'
import getCIDimensionsInjector from './getCIDimensionsInjector'
import { makeGetInvocation } from './selectors'

class ComponentInvocationTreeContainer extends React.Component {
  render() {
    const {
      connectDragSource,
      componentInvocationRef,
      isDragging,
      ...props
    } = this.props
    const { isOverCIT1, isOverCIT2, closed } = props
    const isOverCI = isOverCIT1 || isOverCIT2
    const isClosed = closed && !isOverCI

    //  https://github.com/react-dnd/react-dnd/issues/998
    return !isDragging ? connectDragSource(
      <div>
        <div ref={componentInvocationRef} style={{ display: 'table', width: 'auto' }}>
          <ComponentInvocationTree {...props} isOverCI={isOverCI} closed={isClosed} />
        </div>
      </div>
    ) : null
  }
}

/* connect */
const makeMapStateToProps = () => {
  const getInvocation = makeGetInvocation()
  return (state, props) => getInvocation(state, props)
}

const mapDispatchToProps = { }

/* dnd */
// source
const propSource = {
  beginDrag(props) {
    const { invocationId, ciDimensions, depth, parentId } = props
    return {
      sourceInvocationId: invocationId,
      ciDimensions,
      depth,
      parentId,
    }
  },
  canDrag(props) {
    return props.depth !== 1
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
  dragItem: monitor.getItem(),
})

/* compose export */
export default compose(
  connect(makeMapStateToProps, mapDispatchToProps),
  getCIDimensionsInjector,
  DragSource(COMPONENT_INVOCATION, propSource, sourceCollect),
  DropTarget(acceptedDropTypes, dropzoneTarget, targetCollect),
  DropTarget(acceptedDropTypes, dropzoneTarget, targetTwoCollect)
)(ComponentInvocationTreeContainer)


/* propTypes */
ComponentInvocationTreeContainer.propTypes = forbidExtraProps({
  // passed by parent
  invocationId: T.number.isRequired,
  depth: T.number.isRequired,
  parentId: T.number,
  type: T.oneOf([COMPONENT_INVOCATION, PARAM_INVOCATION]),

  // injected by getCIDimensionsInjector
  componentInvocationRef: T.shape({ current: T.any }).isRequired,
  ciDimensions: T.shape({ clientWidth: T.number, clientHeight: T.number }).isRequired,

  // injected by makeGetInvocation
  name: T.string.isRequired,
  childInvocations: T.arrayOf(T.object).isRequired,
  paramIds: T.arrayOf(T.number).isRequired,
  params: T.arrayOf(T.object).isRequired,
  paramChildren: T.arrayOf(T.object),
  closed: T.bool.isRequired,
  hasPropsSpread: T.bool.isRequired,

  // Injected by React DnD:
  connectDragSource: T.func.isRequired,
  connectDropTarget: T.func.isRequired,
  connectClosingDropTarget: T.func.isRequired,
  isDragging: T.bool,
  isOverCIT1: T.bool.isRequired,
  isOverCIT2: T.bool.isRequired,
  dragItem: T.shape({ name: T.string }),
})

ComponentInvocationTreeContainer.defaultProps = {
  parentId: null,
  paramChildren: [],
  dragItem: null,
  isDragging: false,
  type: null,
}
