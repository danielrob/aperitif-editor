import React from 'react'
import styled from 'styled-as-components'
import { PlusIcon } from 'components'

export default styled(() => <PlusIcon />).as.span`
  color: white;
  cursor: pointer;
  background-color: #2d291852;
  &:hover {
    background-color: #2d2918a3;
  }
  display: inline-block;
  border: 1px solid #4e141421;
  border-radius: 8px;
  padding: 2px 4px;
  line-height: 0;
  transform: translateY(-1.5px);
  margin-bottom: 5px;
  margin-left: ${props => props.left || 0}px;
`
