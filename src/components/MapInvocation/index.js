import React from 'react'
import { JSX, Input } from 'components'
import { indent } from 'utils'

const MapInvocation = ({ invocation: { invocationId, nameId, invocationIds }, depth }) => (
  <React.Fragment>
    .map(<Input nameId={nameId} /> => (
    <JSX
      parentId={invocationId}
      invocationId={invocationIds[0]}
      depth={depth + 1}
      initial
    />
    {indent(depth)}))
  </React.Fragment>
)

export default MapInvocation
