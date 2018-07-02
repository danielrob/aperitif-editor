import React from 'react'
import styled from 'styled-components'

const ExportAppButton = styled.button.attrs({
  children: props => props.text,
})`
  user-select: none;
  position: absolute;
  top: ${props => (props.position || 1) * 20}px;
  right: ${props => props.left ? 'auto' : '20px'};
  left: ${props => props.left ? '20px' : 'auto'};
  border: 1px solid black;
  padding: 5px;
`

export default props => props.onClick ? <ExportAppButton {...props} /> : null
