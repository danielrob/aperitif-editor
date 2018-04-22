import React from 'react'
import styled from 'styled-components'
import { DropTarget } from 'react-dnd'
import { findDOMNode } from 'react-dom'

import { Line, Flex } from 'components'
import { capitalize } from 'utils'

import { DraggableTypes } from 'constantz'

const DropzoneS = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  height: 25px;
  padding: 5px 0;
  margin: -5px 0;
  width: 100%;
  &:hover {
    height: 25px;
  }
  & > .line {
    display: none;
  }
  &:hover > .line {
    display: block;
  }

  ${props => props.isOver && 'opacity: 0.5'}
  ${props => props.isOver && 'height: 25px'}

  margin-left: ${props => Number(
    (Object.keys(props).find(key => key.includes('ind')) || '').replace('ind', '')
  ) * 6}px;
`

const dropzoneTarget = {
  drop(props, monitor) {
    const { onClickAction, parentId, position } = props
    const { name } = monitor.getItem()
    onClickAction({
      parentId,
      position,
      name,
    })
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    dragItem: monitor.getItem()
  };
}

const DropActionSelect = ({ dragItem }) => (
  <Flex>
    <small>
      {`{${dragItem.name}}`}
    </small>
    <small>
      {'<'}{capitalize(dragItem.name)}{'>{'}{dragItem.name}{'}</'}{capitalize(dragItem.name)}{'>'}
    </small>
    <small>
      {'<'}{capitalize(dragItem.name)}{` ${dragItem.name}={${dragItem.name}} />`}
    </small>
  </Flex>
)

class DropZone extends React.Component {
  render() {
    const { connectDropTarget, isOver, dragItem, onClickAction, parentId, position } = this.props
    return (
      <DropzoneS
        onClick={() => onClickAction({ parentId, position })}
        innerRef={innerRef => connectDropTarget(findDOMNode(innerRef))}
        {...this.props}
      >
        {isOver &&
          <DropActionSelect dragItem={dragItem} />
        }
        <Line in4>
          <span>[+]</span> new component
        </Line>
      </DropzoneS>
    )
  }
}

export default DropTarget(DraggableTypes.PROP, dropzoneTarget, collect)(DropZone)
