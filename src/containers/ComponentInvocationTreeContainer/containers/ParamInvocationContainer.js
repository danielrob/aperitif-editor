import T from 'prop-types'
import { forbidExtraProps } from 'airbnb-prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { DragSource } from 'react-dnd'

import { PARAM_INVOCATION } from 'constantz'
import { compose } from 'utils'

import { ParamInvocation } from '../components'
import { makeGetParamInvocation } from '../selectors'

const ParamInvocationContainer = ({
  id,
  invocationId,
  ...props
}) => <ParamInvocation {...props} />

/* connect */
const makeMapStateToProps = () => {
  const getInvocation = makeGetParamInvocation()
  return (state, props) => getInvocation(state, props)
}

/* dnd */
const propSource = {
  beginDrag(props) {
    const { id, name, parentId, invocationId } = props
    return {
      // hover preview
      name,
      type: PARAM_INVOCATION,
      // drop
      sourceParentId: parentId,
      sourceInvocationId: invocationId,
      // canDrop
      callParamId: id,
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

/* propTypes */
ParamInvocationContainer.propTypes = forbidExtraProps({
  id: T.number.isRequired,
  depth: T.number.isRequired,
  parentId: T.number.isRequired,
  invocationId: T.number.isRequired,
  name: T.string.isRequired,
  declIsSpreadMember: T.bool.isRequired,
  isPIDragging: T.bool.isRequired,
  connectDragSource: T.func.isRequired,
  chainedInvocations: T.arrayOf(T.shape({})),
  inline: T.bool.isRequired,
})

ParamInvocationContainer.defaultProps = {
  chainedInvocations: [],
}
