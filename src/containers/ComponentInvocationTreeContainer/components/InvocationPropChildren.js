import React from 'react'
import styled from 'styled-as-components'
import theme from 'theme-proxy'

import { In } from 'components'

const InvocationPropChildren = ({ modelChildren }) => (
  <React.Fragment>
    {modelChildren.length ? (
      <React.Fragment>
        <br />
        <In />
      </React.Fragment>
    ) : null}
    {modelChildren.map(child => (
      <span>
        {'{'}
        <span className="prop-as-child">{child.name}</span>
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
