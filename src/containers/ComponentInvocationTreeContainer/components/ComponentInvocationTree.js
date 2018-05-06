import T from 'prop-types'
import { forbidExtraProps } from 'airbnb-prop-types'
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
  color: ${theme.colors.darkgreen};
  padding-left: 0;
  cursor: ${props => (props.depth === 1 ? 'inherit' : 'pointer')}
  user-select: text;
`

ComponentInvocationTree.propTypes = forbidExtraProps({
  // passed by parent
  invocationId: T.number.isRequired,
  depth: T.number.isRequired,

  // injected by makeGetInvocation
  name: T.string.isRequired,
  invocationIds: T.arrayOf(T.number).isRequired,
  paramIds: T.arrayOf(T.number).isRequired,
  params: T.arrayOf(T.object).isRequired,
  modelChildren: T.arrayOf(T.object),
  closed: T.bool.isRequired,
  hasPropsSpread: T.bool.isRequired,

  // Injected by React DnD:
  connectDropTarget: T.func.isRequired,
  connectClosingDropTarget: T.func.isRequired,
  isOverCIT1: T.bool.isRequired, // opening tag down
  isOverCIT2: T.bool.isRequired, // closing tag up
  dragItem: T.shape({ name: T.string }),

  // injected by container
  ciDimensions: T.shape({ clientWidth: T.number, clientHeight: T.number }).isRequired,
  isOverCI: T.bool.isRequired, // whole component
})

ComponentInvocationTree.defaultProps = {
  modelChildren: [],
  dragItem: null,
}
