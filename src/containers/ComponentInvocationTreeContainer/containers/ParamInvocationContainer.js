import React from 'react'
import { DragSource } from 'react-dnd'
import { findDOMNode } from 'react-dom'

import { PARAM_INVOCATION } from 'constantz'

import { ParamInvocation } from '../components'

const ParamInvocationContainer = ({ connectDragSource, ...props }) => (
  <ParamInvocation innerRef={innerRef => connectDragSource(findDOMNode(innerRef))} {...props} />
)

/* dnd */
const propSource = {
  beginDrag(props) {
    return props
  },
}

const collect = connect => ({
  connectDragSource: connect.dragSource(),
})

/* export */
export default DragSource(PARAM_INVOCATION, propSource, collect)(ParamInvocationContainer)
