import React from 'react'
import styled from 'styled-as-components'

import { PropDropzonesReveal } from './'

const PropDropzones = ({ dragItem, isOver, isSupremeOver }) =>
  isSupremeOver ? <PropDropzonesReveal dragItem={dragItem} /> : null

export default styled(PropDropzones).as.div`
  position: relative;
  display: flex;
  align-items: center;
  cursor: pointer;
  width: 100%;
  ${props => props.isSupremeOver && 'min-height: 30px'}
  transition: min-height 50ms;
`
