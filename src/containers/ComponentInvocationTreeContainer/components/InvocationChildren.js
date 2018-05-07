import T from 'prop-types'
import React from 'react'

import { COMPONENT_INVOCATION, PARAM_INVOCATION } from 'constantz'
import { ComponentInvocationTreeContainer } from 'containers'

import { ParamInvocationContainer, IntermediaryDropzonesContainer } from '../containers'

const types = {
  [COMPONENT_INVOCATION]: ComponentInvocationTreeContainer,
  [PARAM_INVOCATION]: ParamInvocationContainer,
}

const InvocationChildren = ({ invocationId: parentId, childInvocations, depth }) =>
  childInvocations.reduce(
    (out, { id: invocationId, type }, position) => {
      const Component = types[type] || ComponentInvocationTreeContainer

      out.push(
        <Component
          key={invocationId}
          parentId={parentId}
          invocationId={invocationId}
          depth={depth + 1}
        />
      )
      out.push(
        <IntermediaryDropzonesContainer
          key={`after-${invocationId}-dropzone`}
          invocationId={parentId}
          depth={depth}
          position={position}
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
  isOverCI: T.bool.isRequired,
  // ...props - see ComponentInvocationTree
}
