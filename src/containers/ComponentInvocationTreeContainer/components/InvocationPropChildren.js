import React from 'react'
import styled from 'styled-as-components'

import { indent } from 'utils'

import { ParamInvocationContainer } from '../containers'

const InvocationPropChildren = ({ paramChildren, depth }) => (
  <React.Fragment>
    {!!paramChildren.length && indent(depth + 1)}
    {paramChildren.map(({ name, displayId, isSpreadMember }) => (
      <ParamInvocationContainer key={displayId} name={name} isSpreadMember={isSpreadMember} />
    ))}
  </React.Fragment>
)

export default styled(InvocationPropChildren).as.div`
`
