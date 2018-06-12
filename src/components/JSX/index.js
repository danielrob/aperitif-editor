import T from 'prop-types'
import React from 'react'

import {
  COMPONENT_INVOCATION,
  PARAM_INVOCATION,
  ARRAY_MAP_METHOD,
  VAR_INVOCATION,
} from 'constantz'
import { ArrayMapInvocation, VarInvocation } from 'components'
import {
  InvocationContainer,
  ComponentInvocationContainer,
  ParamInvocationContainer,
} from 'containers'

// functionize due to module importing problems
const types = () => ({
  [COMPONENT_INVOCATION]: ComponentInvocationContainer,
  [PARAM_INVOCATION]: ParamInvocationContainer,
  [ARRAY_MAP_METHOD]: ArrayMapInvocation,
  [VAR_INVOCATION]: VarInvocation,
})

const JSX = ({ invocationId, initial, ...props }) => (
  <InvocationContainer
    invocationId={invocationId}
    render={invocation => {
      const Invocation = types()[invocation.type] || ComponentInvocationContainer
      const propsToPass = initial ? { ...props, initial } : props
      return (
        <Invocation
          key={invocationId}
          invocationId={invocationId} // containers use custom invocation selection
          invocation={invocation} // components just use default selectInvocation
          {...propsToPass}
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
