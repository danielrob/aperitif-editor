import T from 'prop-types'
import { forbidExtraProps, or, explicitNull } from 'airbnb-prop-types'
import React from 'react'
import styled from 'styled-as-components'

import { fileTypes, fileTypesArray } from 'constantz'
import { Input, ReactIcon, FolderIcon, JSONIcon, AddButton } from 'components'

import { FileContainer } from '../containers'

class File extends React.PureComponent {
  render() {
    const {
      nameId,
      name,
      parentName,
      type,
      fileChildren,
      isDragging,
      connectDragPreview,
      connectDropTarget,
      path,
      isDirectory,
      isCurrent,
      isSelected,
      containsCurrent,
    } = this.props
    const displayName = (name.includes('index') && isDragging && parentName) || name

    return connectDropTarget(
      <div>
        <FileName {...this.props}>
          {isCurrent && (
            <span role="img" aria-label="pointer" className="pointer">
              👉
            </span>
          )}
          {type === fileTypes.JS && <ReactIcon />}
          {type === fileTypes.JSON_TYPE && <JSONIcon />}
          {connectDragPreview(
            <div style={{ display: 'inline-block' }}>
              {isDirectory && <FolderIcon open={containsCurrent} />}
              {!name.includes('index') && parentName ? (
                <Input nameId={nameId} pointer shouldActivateOnClick={isSelected} />
              ) : (
                displayName
              )}
            </div>,
            { captureDraggingState: true }
          )}
          {type && type !== fileTypes.DIR && `.${type}`}
          {name === 'components' && <AddButton left="10" />}
          {name === 'containers' && <AddButton left="10" />}
        </FileName>
        {fileChildren.map(fileId => (
          <FileContainer key={fileId} fileId={fileId} parentName={name} path={[...path, fileId]} />
        ))}
      </div>
    )
  }
}

File.propTypes = forbidExtraProps({
  // passed by parent / file explorer
  nameId: T.number.isRequired,
  name: T.string.isRequired,
  type: T.oneOf(fileTypesArray).isRequired,
  // eslint-disable-next-line react/require-default-props
  parentName: or([T.string.isRequired, explicitNull()]),
  fileChildren: T.arrayOf(T.number).isRequired,
  path: T.arrayOf(T.number).isRequired,
  isCurrent: T.bool.isRequired,
  isSelected: T.bool.isRequired,
  containsCurrent: T.bool.isRequired,

  // Injected by React DnD:
  connectDragPreview: T.func.isRequired,
  connectDropTarget: T.func.isRequired,
  isDragging: T.bool.isRequired,

  // for wrapper
  innerRef: T.func.isRequired,
  onClick: T.func.isRequired,
  isDirectory: T.bool.isRequired,
})

export default styled(File).as.div`
  ${props => props.parentName && 'cursor: pointer;'}
  ${props => props.parentName && 'margin-left: 15px;'}
  ${props => props.isDirectory && 'padding: 5px 0;'}
  .pointer {
    margin-right: -10px;
  }
`

const FileName = styled.div`
  white-space: nowrap;
`
