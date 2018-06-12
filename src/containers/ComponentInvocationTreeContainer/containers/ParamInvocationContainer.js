import React from 'react'
import { connect } from 'react-redux'
import { DragSource } from 'react-dnd'

import { PARAM_INVOCATION } from 'constantz'
import { compose } from 'utils'

import { ParamInvocation } from '../components'
import { makeSelectParamInvocation } from '../selectors'

const ParamInvocationContainer = props => <ParamInvocation {...props} />

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
    const { invocation: { callParamId, name, invocationId }, parentId } = props
    return {
      // hover preview
      name,
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
  connect(makeMapStateToProps, {}),
  DragSource(PARAM_INVOCATION, propSource, collect),
)(ParamInvocationContainer)

