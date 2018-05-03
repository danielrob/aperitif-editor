import React from 'react'
import styled from 'styled-as-components'

import theme from 'theme-proxy'
import { indent } from 'utils'

const InvocationPropChildren = ({ modelChildren, depth }) => (
  <React.Fragment>
    {modelChildren.length ? (
      <React.Fragment>
        <br />
        {indent(depth + 1)}
      </React.Fragment>
    ) : null}
    {modelChildren.map(child => (
      <span key={child.id}>
        {'{'}
        <span className="prop-as-child">
          {child.isSpreadMember && 'props.'}
          {child.name}
        </span>
        {'}'}
      </span>
    ))}
  </React.Fragment>
)

export default styled(InvocationPropChildren).as.span`
  .prop-as-child {
    color: ${theme.colors.darkblue}
  }
`
