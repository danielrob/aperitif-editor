import React from 'react'
import { JSX } from 'components'
import { indent } from 'utils'

const VarInvocation = ({ invocation: { invocationId, name, invocationIds }, depth }) => (
  <div>
    {indent(depth)}{name}
    {invocationIds.length === 1 &&
      <JSX
        parentId={invocationId}
        invocationId={invocationIds[0]}
        depth={depth}
        initial
      />
    }
  </div>
)

export default VarInvocation
