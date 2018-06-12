import T from 'prop-types'
import { forbidExtraProps } from 'airbnb-prop-types'
import React from 'react'
import styled from 'styled-as-components'

import theme from 'theme-proxy'
import { paramInvocationPropTypes } from 'model-prop-types'
import { singular } from 'pluralize'

import { indent } from 'utils'

import { JSX } from 'components'

const ParamInvocation = ({
  connectDragSource,
  isPIDragging,
  parentId,
  inline,
  depth,
  invocation: {
    name,
    declIsSpreadMember,
    chainedInvocations,
  },
}) => {
  const chainedInvocation = chainedInvocations[0]

  return isPIDragging ? null : (
    <React.Fragment>
      {!inline && indent(depth)}
      {connectDragSource(
        <div className="dragsource">
          {'{'}
          {declIsSpreadMember && 'props.'}
          {name}
          {chainedInvocation &&
            <React.Fragment>
              .map({singular(name)} => (
              <JSX
                key={chainedInvocation.id}
                parentId={parentId}
                invocationId={chainedInvocation.id}
                depth={1}
                initial
              />
              ))
            </React.Fragment>
          }
          {'}'}
        </div>
      )}
    </React.Fragment>
  )
}


/* propTypes */
ParamInvocation.propTypes = forbidExtraProps({
  // passed by parent
  parentId: T.number.isRequired,
  inline: T.bool.isRequired,
  depth: T.number.isRequired,

  // injected by makeSelectParamInvocation
  invocation: paramInvocationPropTypes.isRequired,

  // injected by DragSource
  isPIDragging: T.bool.isRequired,
  connectDragSource: T.func.isRequired,
})

/* style, export */
export default styled(ParamInvocation).as.div`
  ${props => props.inline && 'display: inline-block;'}
  color: ${theme.colors.darkblue}
  .dragsource {
    display: inline-block;
    user-select: text;
    cursor: pointer;
  }
`

