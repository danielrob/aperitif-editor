import React from 'react'

import { ComponentInvocationTreeContainer } from 'containers'

const InvocationChildren = ({ invocationIds, depth }) =>
  invocationIds.reduce(
    (out, invocationId) => {
      out.push(
        <ComponentInvocationTreeContainer
          key={invocationId}
          invocationId={invocationId}
          depth={depth + 1}
        />
      )
      return out
    },
    []
  )

export default InvocationChildren
