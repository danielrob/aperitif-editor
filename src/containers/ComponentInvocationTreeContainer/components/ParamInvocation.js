import T from 'prop-types'
import { forbidExtraProps } from 'airbnb-prop-types'
import React from 'react'
import styled from 'styled-as-components'
import theme from 'theme-proxy'
import { singular } from 'pluralize'

import { indent } from 'utils'

import { ComponentInvocationTreeContainer } from 'containers'

const ParamInvocation = ({
  declIsSpreadMember,
  connectDragSource,
  chainedInvocations,
  isPIDragging,
  parentId,
  name,
  depth,
}) => {
  const chainedInvocation = chainedInvocations[0]

  return isPIDragging ? null : (
    <React.Fragment>
      {indent(depth)}
      {connectDragSource(
        <div className="dragsource">
          {'{'}
          {declIsSpreadMember && 'props.'}
          {name}
          {chainedInvocation &&
            <React.Fragment>
              .map({singular(name)} => (
              <ComponentInvocationTreeContainer
                key={chainedInvocation.id}
                parentId={parentId}
                invocationId={chainedInvocation.id}
                depth={1}
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
export default styled(ParamInvocation).as.div`
  color: ${theme.colors.darkblue}
  .dragsource {
    display: inline-block;
    user-select: text;
    cursor: pointer;
  }
`

ParamInvocation.propTypes = forbidExtraProps({
  name: T.string.isRequired,
  parentId: T.number.isRequired,
  depth: T.number.isRequired,
  isPIDragging: T.bool.isRequired,
  declIsSpreadMember: T.bool.isRequired,
  connectDragSource: T.func.isRequired,
  chainedInvocations: T.arrayOf(T.shape({})),
})

ParamInvocation.defaultProps = {
  chainedInvocations: [],
}
