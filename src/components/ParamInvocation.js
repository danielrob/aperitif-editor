import T from 'prop-types'
import { forbidExtraProps } from 'airbnb-prop-types'
import React from 'react'
import styled from 'styled-as-components'

import theme from 'theme-proxy'
import { paramInvocationPropTypes } from 'model-prop-types'

import { indent } from 'utils'

import { JSX } from 'components'
import { Name } from 'containers'

const ParamInvocation = ({
  connectDragSource,
  isPIDragging,
  parentId,
  depth,
  invocation: {
    nameId,
    declIsSpreadMember,
    invocationIds,
    inline,
  },
}) => isPIDragging ? null : (
  <React.Fragment>
    {!inline && indent(depth)}
    {connectDragSource(
      <span className="dragsource">
        {'{'}
        {declIsSpreadMember && 'props.'}
        <Name nameId={nameId} />
        {invocationIds.length === 1 &&
          <JSX
            parentId={parentId}
            invocationId={invocationIds[0]}
            depth={depth}
            initial
          />
        }
        {'}'}
      </span>
    )}
  </React.Fragment>
)


/* 
  propTypes
*/
ParamInvocation.propTypes = forbidExtraProps({
  // passed by parent
  parentId: T.number.isRequired,
  depth: T.number.isRequired,

  // injected by makeSelectParamInvocation
  invocation: paramInvocationPropTypes.isRequired,

  // injected by DragSource
  isPIDragging: T.bool.isRequired,
  connectDragSource: T.func.isRequired,
})

/* style, export */
export default styled(ParamInvocation).as.span`
  color: ${theme.colors.darkblue}
  .dragsource {
    user-select: text;
    cursor: pointer;
  }
`

