import T from 'prop-types'
import React from 'react'
import styled from 'styled-as-components'
import theme from 'theme-proxy'
import { buffer } from 'styleUtils'

import { In } from 'components'

import { OpenTagContainer } from '../containers'
import { InvocationChildren } from './'

const ComponentInvocationTree = ({ connectDropTarget, modelChildren, ...props }) =>
  connectDropTarget(
    <div>
      <OpenTagContainer {...props} />
      {modelChildren.length ? <React.Fragment><br /><In /></React.Fragment> : null}
      {modelChildren.map(child => `{${child.name}}`)}
      <InvocationChildren {...props} />
      {`</${props.name}>`}
    </div>
  )

export default styled(ComponentInvocationTree).as.div`
  color: ${theme.colors.darkgreen};
  ${buffer(10)}
  margin-left: 10px;
  padding-left: 0;
`

ComponentInvocationTree.propTypes = {
  id: T.number.isRequired,
  name: T.string.isRequired,
  invocationIds: T.arrayOf(T.number).isRequired,
  paramIds: T.arrayOf(T.number).isRequired,
  params: T.arrayOf(T.object).isRequired,
  modelChildren: T.arrayOf(T.number),
  // Injected by React DnD:
  connectDropTarget: T.func.isRequired,
  isSupremeOver: T.bool.isRequired,
}

ComponentInvocationTree.defaultProps = {
  modelChildren: [],
}
