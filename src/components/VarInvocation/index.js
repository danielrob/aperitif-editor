import React from 'react'
import styled from 'styled-as-components'
import { JSX } from 'components'
import { NameInput } from 'containers'
import { indent } from 'utils'

const VarInvocation = ({ invocation: { invocationId, nameId, invocationIds }, depth, dot }) => (
  <React.Fragment>
    {dot && <span>.</span>}
    {indent(depth)}<NameInput nameId={nameId} />
    {invocationIds.length === 1 &&
      <JSX
        parentId={invocationId}
        invocationId={invocationIds[0]}
        depth={depth}
        initial
      />
    }
  </React.Fragment>
)

export default styled(VarInvocation).as.span`
  ${props => (props.invocation.inline || props.dot) && 'display: inline-block;'}
`
