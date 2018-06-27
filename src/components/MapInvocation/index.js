import React from 'react'
import { JSX } from 'components'
import { NameInput } from 'containers'
import { indent } from 'utils'

const MapInvocation = ({ invocation: { invocationId, nameId, invocationIds }, depth }) => (
  <React.Fragment>
    .map(<NameInput nameId={nameId} /> => (
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
