import T from 'prop-types'
import { forbidExtraProps } from 'airbnb-prop-types'
import React from 'react'
import styled from 'styled-as-components'

import theme from 'theme-proxy'
import { invocationPropTypes } from 'model-prop-types'
import { COMPONENT_INVOCATION, PARAM_INVOCATION } from 'constantz'

import { OpenTagContainer } from '../containers'
import { InvocationChildren, CloseTag, CIDropzones } from './'

const ComponentInvocation = ({
  depth,
  invocation,
  invocation: { invocationId, invocationIds, closed, inline },
  connectDropTarget,
  connectClosingDropTarget,
  isOverCIT1,
  isOverCIT2,
  dragItem,
  isOverCI,
}) => (
  <React.Fragment>
    {/* <Open> */}
    {connectDropTarget(
      <span>
        <OpenTagContainer
          depth={depth}
          invocation={invocation}
        />
        <CIDropzones
          invocationId={invocationId}
          depth={depth}
          dragItem={dragItem}
          position={0}
          shouldDisplay={isOverCIT1 && !closed}
        />
      </span>
    )}
    {/* {children} */}
    <InvocationChildren
      depth={depth}
      invocation={invocation}
      isOverCI={isOverCI}
    />
    {/* </Close> */}
    {connectClosingDropTarget(
      <span>
        <CIDropzones
          invocationId={invocationId}
          depth={depth}
          dragItem={dragItem}
          position={invocationIds.length}
          shouldDisplay={isOverCIT2 && !closed}
        />
        <CloseTag
          depth={depth}
          invocation={invocation}
        />
      </span>
    )}
  </React.Fragment>
)

/* propTypes */
ComponentInvocation.propTypes = forbidExtraProps({
  // parent
  depth: T.number.isRequired,
  initial: T.bool.isRequired,
  parentId: T.number,
  type: T.oneOf([COMPONENT_INVOCATION, PARAM_INVOCATION]),

  // container
  invocation: invocationPropTypes.isRequired,
  isOverCI: T.bool.isRequired,

  // React DnD:
  connectDropTarget: T.func.isRequired,
  connectClosingDropTarget: T.func.isRequired,
  isOverCIT1: T.bool.isRequired,
  isOverCIT2: T.bool.isRequired,
  dragItem: T.shape({ name: T.string }),
})

ComponentInvocation.defaultProps = {
  dragItem: null,
  parentId: null,
  type: null,
}

/* style, export */
export default styled(ComponentInvocation).as.span`
  color: ${theme.colors.darkgreen};
  padding-left: 0;
  cursor: ${props => (props.initial ? 'inherit' : 'pointer')}
  user-select: text;
  line-height: 2;
`
