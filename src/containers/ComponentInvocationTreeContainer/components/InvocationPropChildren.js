import React from 'react'
import styled from 'styled-as-components'

import { indent } from 'utils'

import { ParamInvocationContainer } from '../containers'

const InvocationPropChildren = ({ paramChildren, depth, invocationId }) => (
  <React.Fragment>
    {!!paramChildren.length && indent(depth + 1)}
    {paramChildren.map(({ id, name, displayId, isSpreadMember }) => (
      <ParamInvocationContainer
        key={displayId}
        paramId={id}
        name={name}
        invocationId={invocationId}
        isSpreadMember={isSpreadMember}
      />
    ))}
  </React.Fragment>
)

export default styled(InvocationPropChildren).as.div`
`
