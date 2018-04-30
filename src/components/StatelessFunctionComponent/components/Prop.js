import React from 'react'
import styled from 'styled-as-components'
import theme from 'theme-proxy'

const Prop = ({ name, connectDragSource }) => connectDragSource(<span>{name}</span>)

export default styled(Prop).as.div`
  display: inline-block;
  margin: 0 3px;
  cursor: pointer;
  color: ${theme.colors.darkgreen};
  &:not(:last-child):after {
    content: ',';
  }
`

