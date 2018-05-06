import T from 'prop-types'
import { forbidExtraProps } from 'airbnb-prop-types'
import React from 'react'
import { DragSource } from 'react-dnd'
import { findDOMNode } from 'react-dom'

import { PARAM_INVOCATION } from 'constantz'

import { ParamInvocation } from '../components'

const ParamInvocationContainer = ({
  connectDragSource,
  paramId, // eslint-disable-line no-unused-vars
  invocationId, // eslint-disable-line no-unused-vars
  ...props
}) => <ParamInvocation innerRef={innerRef => connectDragSource(findDOMNode(innerRef))} {...props} />

/* dnd */
const propSource = {
  beginDrag(props) {
    const { paramId, name, invocationId } = props
    return {
      // hover preview
      name,
      type: PARAM_INVOCATION,
      // drop
      paramId,
      sourceInvocationId: invocationId,
    }
  },
}

const collect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isPIDragging: monitor.isDragging(),
})

/* export */
export default DragSource(PARAM_INVOCATION, propSource, collect)(ParamInvocationContainer)

ParamInvocationContainer.propTypes = forbidExtraProps({
  paramId: T.number.isRequired,
  invocationId: T.number.isRequired,
  name: T.string.isRequired,
  isSpreadMember: T.bool.isRequired,
  isPIDragging: T.bool.isRequired,

  connectDragSource: T.func.isRequired, // eslint-disable-line react/no-unused-prop-types
})
