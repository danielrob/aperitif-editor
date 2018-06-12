import T from 'prop-types'
import React from 'react'

import { invocationPropTypes } from 'model-prop-types'
import { COMPONENT_INVOCATION, PARAM_INVOCATION } from 'constantz'
import { ComponentInvocationTreeContainer } from 'containers'

import { ParamInvocationContainer, IntermediaryDropzonesContainer } from '../containers'

const types = {
  [COMPONENT_INVOCATION]: ComponentInvocationTreeContainer,
  [PARAM_INVOCATION]: ParamInvocationContainer,
}

const InvocationChildren = ({
  invocation: {
    invocationId: parentId,
    childInvocations,
    inline,
  },
  depth,
}) =>
  childInvocations.reduce(
    (out, { id: invocationId, type }, position) => {
      const Component = types[type] || ComponentInvocationTreeContainer

      out.push(
        <Component
          key={invocationId}
          parentId={parentId}
          invocationId={invocationId}
          parentIsInline={inline}
          depth={depth + 1}
        />
      )
      if (!inline) {
        out.push(
          <IntermediaryDropzonesContainer
            key={`after-${invocationId}-dropzone`}
            invocationId={parentId}
            depth={depth}
            position={position}
          />
        )
      }
      return out
    },
    []
  )

/* propTypes */
InvocationChildren.propTypes = {
  invocation: invocationPropTypes.isRequired,
  depth: T.number.isRequired,
  isOverCI: T.bool.isRequired,
}

export default InvocationChildren

