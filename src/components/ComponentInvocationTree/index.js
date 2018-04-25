import T from 'prop-types'
import React from 'react'
import styled from 'styled-as-components'
import theme from 'theme-proxy'

import { InvocationChildren } from './components'

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

ComponentInvocationTree.propTypes = {
  id: T.number.isRequired,
  name: T.string.isRequired,
  invocationIds: T.arrayOf(T.number).isRequired,
}
