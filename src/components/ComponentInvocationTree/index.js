import React from 'react'
import styled from 'styled-as-components'
import theme from 'theme-proxy'

import InvocationChildren from './InvocationChildren'

const ComponentInvocationTree = ({ name, ...props }) => (
  <React.Fragment>
    {`<${name}>`}
    <InvocationChildren {...props} />
    {`</${name}>`}
  </React.Fragment>
)

export default styled(ComponentInvocationTree).as.div`
  color: ${theme.colors.darkgreen};
  margin-left: 12px;
`
