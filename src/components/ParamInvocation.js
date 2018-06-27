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
      <div className="dragsource">
        {'{'}
        {declIsSpreadMember && 'props.'}
        <Name nameId={nameId} />
        {invocationIds.length === 1 &&
          <JSX
            parentId={parentId}
            invocationId={invocationIds[0]}
            depth={0}
            initial
          />
        }
        {'}'}
      </div>
    )}
  </React.Fragment>
)


/* propTypes */
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
export default styled(ParamInvocation).as.div`
  ${props => props.invocation.inline && 'display: inline-block;'}
  color: ${theme.colors.darkblue}
  .dragsource {
    display: inline-block;
    user-select: text;
    cursor: pointer;
  }
`

