import React from 'react'
import styled from 'styled-as-components'
import { JSX, Input } from 'components'
import { indent } from 'utils'

const VarInvocation = ({ invocation: { invocationId, nameId, invocationIds }, depth, dot }) => (
  <React.Fragment>
    {dot && <span>.</span>}
    {indent(depth)}<Input nameId={nameId} />
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

export default styled(VarInvocation).as.div`
  ${props => (props.invocation.inline || props.dot) && 'display: inline-block;'}
`
