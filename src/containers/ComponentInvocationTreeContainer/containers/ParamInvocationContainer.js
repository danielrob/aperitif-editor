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
  callParamId, // eslint-disable-line no-unused-vars
  parentId, // eslint-disable-line no-unused-vars
  invocationId, // eslint-disable-line no-unused-vars
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
    const { callParamId, name, parentId, invocationId } = props
    return {
      // hover preview
      name,
      type: PARAM_INVOCATION,
      // drop
      callParamId,
      sourceParentId: parentId,
      sourceInvocationId: invocationId,
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


ParamInvocationContainer.propTypes = forbidExtraProps({
  callParamId: T.number.isRequired,
  depth: T.number.isRequired,
  parentId: T.number.isRequired,
  invocationId: T.number.isRequired,
  name: T.string.isRequired,
  isSpreadMember: T.bool.isRequired,
  isPIDragging: T.bool.isRequired,
  connectDragSource: T.func.isRequired,
})
