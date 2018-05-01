import React from 'react'
import styled from 'styled-as-components'

import { PropDropzonesReveal } from './'

const PropDropzones = ({ parentId, dragItem, position, isSupremeOver }) =>
  isSupremeOver ? (
    <PropDropzonesReveal dragItem={dragItem} parentId={parentId} position={position} />
  ) : null

export default styled(PropDropzones).as.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  ${props => props.isSupremeOver && 'min-height: 35px'}
  ${props => props.isSupremeOver && 'padding: 5px'}
  transition: min-height 50ms;
`
