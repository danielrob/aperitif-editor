import T from 'prop-types'
import React from 'react'
import styled from 'styled-as-components'

import theme from 'theme-proxy'

import { OpenTagContainer } from '../containers'
import { InvocationChildren, InvocationPropChildren, CloseTag } from './'

const ComponentInvocationTree = ({
  connectDragSource,
  connectDropTarget,
  modelChildren,
  isDragging,
  ...props
}) =>
  connectDragSource(
    connectDropTarget(
      <div style={{ userSelect: 'text' }}>
        {!isDragging && (
          <React.Fragment>
            <OpenTagContainer {...props} />
            {/* TODO: Invocation can have a child expression which evaluates to all of this: */}
            <InvocationPropChildren modelChildren={modelChildren} depth={props.depth} />
            <InvocationChildren {...props} />
            {/* End TODO */}
            {!props.closed && <CloseTag name={props.name} depth={props.depth} />}
          </React.Fragment>
        )}
      </div>
    )
  )

export default styled(ComponentInvocationTree).as.div`
  display: table;
  width: auto;
  color: ${theme.colors.darkgreen};
  padding-left: 0;
  cursor: ${props => (props.depth === 0 ? 'inherit' : 'pointer')}
`

ComponentInvocationTree.propTypes = {
  id: T.number.isRequired,
  name: T.string.isRequired,
  invocationIds: T.arrayOf(T.number).isRequired,
  paramIds: T.arrayOf(T.number).isRequired,
  params: T.arrayOf(T.object).isRequired,
  modelChildren: T.arrayOf(T.object),
  isClosed: T.bool,
  hasPropsSpread: T.bool,
  // Injected by React DnD:
  connectDragSource: T.func.isRequired,
  connectDropTarget: T.func.isRequired,
  isSupremeOver: T.bool.isRequired,
  isDragging: T.bool.isRequired,
}

ComponentInvocationTree.defaultProps = {
  modelChildren: [],
}
