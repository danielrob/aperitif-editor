import React from 'react'
import { DropTarget } from 'react-dnd'
import { findDOMNode } from 'react-dom'

import { Line, Flex } from 'components'
import { capitalize } from 'utils'
import { DraggableTypes } from 'constantz'

import DropzoneWrapper from './DropzoneWrapper'

const dropzoneTarget = {
  drop(props, monitor) {
    const { onClickAction, parentId, position } = props
    const { name } = monitor.getItem()
    onClickAction({
      parentId,
      position,
      name,
    })
  },
}

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    dragItem: monitor.getItem(),
  }
}

const DropActionSelect = ({ dragItem }) => (
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

class Dropzone extends React.Component {
  render() {
    const { connectDropTarget, isOver, dragItem, onClickAction, parentId, position } = this.props
    return (
      <DropzoneWrapper
        onClick={() => onClickAction({ parentId, position })}
        innerRef={innerRef => connectDropTarget(findDOMNode(innerRef)) /* eslint-disable-line */}
        {...this.props}
      >
        {isOver &&
          <DropActionSelect dragItem={dragItem} />
        }
        <Line in4>
          <span>[+]</span> new component
        </Line>
      </DropzoneWrapper>
    )
  }
}

export default DropTarget(DraggableTypes.PROP, dropzoneTarget, collect)(Dropzone)
