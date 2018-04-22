import React from 'react'
import styled from 'styled-components'
import { DragSource } from 'react-dnd'
import { DraggableTypes } from 'constantz'

const propSource = {
  beginDrag(props) {
    return props
  },
}

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  }
}

const PropStyled = styled.div`
  display: inline-block;
  margin: 0 3px;
  cursor: pointer;
  color: ${props => props.theme.colors.darkgreen};
  &:not(:last-child):after {
    content: ',';
  }
`

const Prop = ({ name, connectDragSource, isDragging }) => (
  <PropStyled>{connectDragSource(<span>{name}</span>)}</PropStyled>
)

export default DragSource(DraggableTypes.PROP, propSource, collect)(Prop)
