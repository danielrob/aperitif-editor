import T from 'prop-types'
import React from 'react'
import styled from 'styled-as-components'
import theme from 'theme-proxy'

import { OpenTagContainer } from '../containers'
import { InvocationChildren, InvocationPropChildren } from './'

const renderCIT = ({ modelChildren, ...props }) => (
  <div>
    <OpenTagContainer {...props} />
    {/* TODO: Invocation can have a child expression which evaluates to all of this: */}
    <InvocationPropChildren modelChildren={modelChildren} />
    <InvocationChildren {...props} />
    {/* End TODO */}
    {props.closed || `</${props.name}>`}
  </div>
)
const ComponentInvocationTree = ({ isRoot, connectDragSource, connectDropTarget, ...props }) =>
  isRoot
    ? connectDropTarget(renderCIT(props))
    : connectDragSource(connectDropTarget(renderCIT(props)))

export default styled(ComponentInvocationTree).as.div`
  display: table;
  width: auto;
  color: ${theme.colors.darkgreen};
  margin-left: 10px;
  padding-left: 0;
  cursor: ${props => props.isRoot ? 'inherit' : 'pointer'}
`

ComponentInvocationTree.propTypes = {
  id: T.number.isRequired,
  name: T.string.isRequired,
  invocationIds: T.arrayOf(T.number).isRequired,
  paramIds: T.arrayOf(T.number).isRequired,
  params: T.arrayOf(T.object).isRequired,
  modelChildren: T.arrayOf(T.object),
  isClosed: T.bool,
  // Injected by React DnD:
  connectDragSource: T.func.isRequired,
  connectDropTarget: T.func.isRequired,
  isSupremeOver: T.bool.isRequired,
}

ComponentInvocationTree.defaultProps = {
  modelChildren: [],
}
