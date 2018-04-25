import T from 'prop-types'
import React from 'react'
import styled from 'styled-as-components'
import theme from 'theme-proxy'

import { OpenTagContainer } from './containers'
import { InvocationChildren } from './components'

const ComponentInvocationTree = ({ name, connectDropTarget, isOver, ...props }) => connectDropTarget(
  <div>
    <OpenTagContainer name={name} isSupremeOver={isOver} />
    <InvocationChildren {...props} isSupremeOver={isOver} />
    {`</${name}>`}
  </div>
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
