import React from 'react'
import styled from 'styled-components'

const ExportAppButton = styled.button.attrs({
  children: props => props.text,
})`
  z-index: 1;
  user-select: none;
  position: absolute;
  ${props => props.fixed && 'position: fixed;'}
  ${props => (props.top === 0 || props.top) && `top: ${props.top}px;`}
  ${props => (props.bottom === 0 || props.bottom) && `bottom: ${props.bottom}px;`}
  ${props => (props.left === 0 || props.left) && `left: ${props.left}px;`}
  ${props => (props.right === 0 || props.right) && `right: ${props.right}px;`}
  border: 1px solid black;
  padding: 3px;
  font-size: 10px;
  border-radius: 3px;
  background-color: white;
  &:hover {
    color: white;
    background-color: #010431bb;
  }
`

export default props => props.onClick ? <ExportAppButton {...props} /> : null
