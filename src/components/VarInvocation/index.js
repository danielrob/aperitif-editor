import React from 'react'
import { JSX, Input } from 'components'
import { indent } from 'utils'

const VarInvocation = ({ invocation: { invocationId, nameId, invocationIds }, depth }) => (
  <div>
    {indent(depth)}<Input nameId={nameId} />
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
