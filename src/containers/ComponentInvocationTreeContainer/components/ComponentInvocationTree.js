import T from 'prop-types'
import React from 'react'
import styled from 'styled-as-components'

import theme from 'theme-proxy'

import { OpenTagContainer } from '../containers'
import { InvocationChildren, InvocationPropChildren, CloseTag, CIDropzones } from './'

const ComponentInvocationTree = ({ connectDropTarget, connectClosingDropTarget, ...props }) => (
  <React.Fragment>
    {connectDropTarget(
      <div>
        <OpenTagContainer {...props} />
        <CIDropzones {...props} position={0} shouldDisplay={props.isOverCIT1 && !props.closed} />
        <InvocationPropChildren {...props} />
      </div>
    )}
    <InvocationChildren {...props} />
    {connectClosingDropTarget(
      <div>
        <CIDropzones
          {...props}
          position={props.invocationIds.length}
          shouldDisplay={props.isOverCIT2 && !props.closed}
        />
        <CloseTag name={props.name} depth={props.depth} shouldDisplay={!props.closed} />
      </div>
    )}
  </React.Fragment>
)

export default styled(ComponentInvocationTree).as.div`
  display: table;
  width: auto;
  color: ${theme.colors.darkgreen};
  padding-left: 0;
  cursor: ${props => (props.depth === 1 ? 'inherit' : 'pointer')}
  user-select: text;
`

ComponentInvocationTree.propTypes = {
  id: T.number.isRequired,
  name: T.string.isRequired,
  invocationIds: T.arrayOf(T.number).isRequired,
  paramIds: T.arrayOf(T.number).isRequired,
  params: T.arrayOf(T.object).isRequired,
  modelChildren: T.arrayOf(T.object),
  closed: T.bool.isRequired,
  hasPropsSpread: T.bool.isRequired,

  // Injected by React DnD:
  connectDropTarget: T.func.isRequired,
  isOverCIT1: T.bool.isRequired,
  isOverCIT2: T.bool.isRequired,
}

ComponentInvocationTree.defaultProps = {
  modelChildren: [],
}
