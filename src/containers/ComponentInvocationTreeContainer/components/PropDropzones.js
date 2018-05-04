import React from 'react'
import styled from 'styled-as-components'

import { indent } from 'utils'

import { PropDropzonesReveal } from './'

const PropDropzones = ({ parentId, dragItem, position, isOverCI, depth }) =>
  isOverCI ? (
    <React.Fragment>
      {indent(depth)}
      <PropDropzonesReveal dragItem={dragItem} parentId={parentId} position={position} />
    </React.Fragment>
  ) : null

export default styled(PropDropzones).as.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  ${props => props.isOverCI && 'min-height: 35px'}
  transition: min-height 50ms;
`
