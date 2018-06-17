import T from 'prop-types'
import { forbidExtraProps } from 'airbnb-prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { DragSource } from 'react-dnd'

import { paramInvocationPropTypes } from 'model-prop-types'
import { PARAM_INVOCATION } from 'constantz'
import { compose } from 'utils'

import ParamInvocation from './ParamInvocation'
import makeSelectParamInvocation from './makeSelectParamInvocation'

const ParamInvocationContainer = ({
  invocationId, // used by connect only
  invocation,
  parentIsInline,
  ...props
}) => (
  <ParamInvocation
    invocation={{
      ...invocation,
      inline: parentIsInline || invocation.inline,
    }}
    {...props}
  />
)

/* propTypes */
ParamInvocationContainer.propTypes = forbidExtraProps({
  // passed by parent
  invocationId: T.number.isRequired,
  parentId: T.number.isRequired,
  parentIsInline: T.bool.isRequired,
  depth: T.number.isRequired,

  // injected by makeSelectParamInvocation
  invocation: paramInvocationPropTypes.isRequired,

  // injected by DragSource
  isPIDragging: T.bool.isRequired,
  connectDragSource: T.func.isRequired,
})


/* connect */
const makeMapStateToProps = () => {
  const getInvocation = makeSelectParamInvocation()
  return (state, props) => ({
    invocation: getInvocation(state, props),
  })
}

/* dnd */
const propSource = {
  beginDrag(props) {
    const {
      invocation: { callParamId, nameId, invocationId },
      parentId,
    } = props
    return {
      // hover preview
      nameId,
      type: PARAM_INVOCATION,
      // drop
      sourceParentId: parentId,
      sourceInvocationId: invocationId,
      // canDrop
      callParamId,
    }
  },
}

const collect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isPIDragging: monitor.isDragging(),
})

/* compose export */
export default compose(
  connect(
    makeMapStateToProps,
    {}
  ),
  DragSource(PARAM_INVOCATION, propSource, collect)
)(ParamInvocationContainer)
