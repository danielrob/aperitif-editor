import React from 'react'
import styled from 'styled-as-components'

import { indent } from 'utils'

import { CIDropzonesReveal } from './'

const CIDropzones = ({ parentId, dragItem, position, isOverCI, depth }) =>
  isOverCI ? (
    <React.Fragment>
      {indent(depth)}
      <CIDropzonesReveal dragItem={dragItem} parentId={parentId} position={position} />
    </React.Fragment>
  ) : null

export default styled(CIDropzones).as.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  ${props => props.isOverCI && 'min-height: 35px'}
  transition: min-height 50ms;
`
