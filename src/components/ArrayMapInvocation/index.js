import React from 'react'
import { singular } from 'pluralize'
import { JSX } from 'components'
import { indent } from 'utils'

const ArrayMapInvocation = ({ invocation: { invocationId, name, invocationIds }, depth }) => (
  <React.Fragment>
    .map({singular(name)} => (
    <JSX
      parentId={invocationId}
      invocationId={invocationIds[0]}
      depth={depth + 1}
      initial
    />
    {indent(depth)}))
  </React.Fragment>
)

export default ArrayMapInvocation
