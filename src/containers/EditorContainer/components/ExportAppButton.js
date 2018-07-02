import React from 'react'
import styled from 'styled-components'

const ExportAppButton = styled.button.attrs({
  children: props => props.text,
})`
  user-select: none;
  position: absolute;
  top: ${props => props.position * 20}px;
  right: 20px;
  border: 1px solid black;
  padding: 5px;
`

export default props => props.onClick && <ExportAppButton {...props} />
