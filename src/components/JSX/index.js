import T from 'prop-types'
import React from 'react'

import { COMPONENT_INVOCATION, PARAM_INVOCATION } from 'constantz'
import { InvocationContainer, ComponentInvocationContainer } from 'containers'
import { ParamInvocationContainer } from 'containers/ComponentInvocationContainer/containers'

const types = {
  [COMPONENT_INVOCATION]: ComponentInvocationContainer,
  [PARAM_INVOCATION]: ParamInvocationContainer,
}

const JSX = ({ invocationId, depth, parentId, parentIsInline }) => (
  <InvocationContainer
    invocationId={invocationId}
    render={({ type }) => {
      const Invocation = types[type] || ComponentInvocationContainer
      return (
        <Invocation
          key={invocationId}
          invocationId={invocationId}
          depth={depth}
          parentId={parentId}
          parentIsInline={parentIsInline}
        />
      )
    }}
  />
)

JSX.propTypes = {
  invocationId: T.number.isRequired,
  initial: T.bool,
  depth: T.number,
  parentId: T.number,
  parentIsInline: T.bool,
}

JSX.defaultProps = {
  initial: false,
  depth: 1,
  parentId: null,
  parentIsInline: false,
}

export default JSX
