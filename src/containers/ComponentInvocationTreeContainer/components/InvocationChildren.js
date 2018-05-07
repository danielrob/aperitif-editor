import T from 'prop-types'
import React from 'react'

import { COMPONENT_INVOCATION, PARAM_INVOCATION } from 'constantz'
import { ComponentInvocationTreeContainer } from 'containers'

import { ParamInvocationContainer } from '../containers'

const types = {
  [COMPONENT_INVOCATION]: ComponentInvocationTreeContainer,
  [PARAM_INVOCATION]: ParamInvocationContainer,
}

const InvocationChildren = ({ invocationId: parentId, childInvocations, depth }) =>
  childInvocations.reduce(
    (out, { id: invocationId, type }) => {
      const Component = types[type] || ComponentInvocationTreeContainer

      out.push(
        <Component
          key={invocationId}
          parentId={parentId}
          invocationId={invocationId}
          depth={depth + 1}
        />
      )
      return out
    },
    []
  )

export default InvocationChildren


/* propTypes */
InvocationChildren.propTypes = {
  invocationId: T.number.isRequired,
  childInvocations: T.arrayOf(T.object).isRequired,
  depth: T.number.isRequired,
  // ...props - see ComponentInvocationTree
}
