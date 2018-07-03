import T from 'prop-types'
import React from 'react'

import { invocationPropTypes } from 'model-prop-types'
import { JSX } from 'components'

import { IntermediaryDropzonesContainer } from '../containers'

const InvocationChildren = ({
  invocation: {
    invocationId: parentId,
    invocationIds,
    inline,
  },
  depth,
}) =>
  invocationIds.reduce(
    (out, invocationId, position) => {
      out.push(
        <JSX
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
            position={position + 1}
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

