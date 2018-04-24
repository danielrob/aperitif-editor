import React from 'react'
import styled from 'styled-as-components'
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

const Prop = ({ name, connectDragSource }) => connectDragSource(<span>{name}</span>)

const PropStyled = styled(Prop).as.div`
  display: inline-block;
  margin: 0 3px;
  cursor: pointer;
  color: ${props => props.theme.colors.darkgreen};
  &:not(:last-child):after {
    content: ',';
  }
`

export default DragSource(DraggableTypes.PROP, propSource, collect)(PropStyled)
