import React from 'react'
import styled from 'styled-components'
import theme from 'theme-proxy'

const dividerThickness = 2

const DividerWrapper = styled.div`
  top: 0;
  width: ${dividerThickness}px;
  cursor: col-resize;
  background-color: ${theme.colors.darkblue}
`

const Divider = ({ width, handleDividerMouseDown }) => (
  <DividerWrapper
    style={{ left: `${width - dividerThickness}px` }}
    onMouseDown={handleDividerMouseDown}
  />
)

export default Divider
