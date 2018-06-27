import T from 'prop-types'
import { forbidExtraProps, or, explicitNull } from 'airbnb-prop-types'
import React from 'react'
import styled from 'styled-as-components'

import { NameInput } from 'containers'
import { filePropTypes } from 'model-prop-types'

import { FileContainer, AddContainerButton, AddComponentButton } from '../containers'
import FileIcon from './FileIcon'

class File extends React.PureComponent {
  render() {
    const {
      file,
      file: {
        nameId,
        name,
        extension,
        fileChildren,
        isSelected,
        isContainersFolder = name === 'containers',
        isComponentsFolder = name === 'components',
      },
      parentName,
      isDragging,
      connectDragPreview,
      connectDropTarget,
      path,
    } = this.props
    const isIndex = name.includes('index')
    const displayName = (!isIndex && isDragging && parentName) || name

    return connectDropTarget(
      <div>
        <NoWrap>
          <FileIcon file={file} />
          {connectDragPreview(
            <div style={{ display: 'inline-block' }}>
              {!isIndex && parentName ? (
                <NameInput nameId={nameId} pointer shouldActivateOnClick={isSelected} />
              ) : (
                displayName
              )}
            </div>,
            { captureDraggingState: true }
          )}
          {extension}
          {isComponentsFolder && <AddComponentButton left="10" />}
          {isContainersFolder && <AddContainerButton left="10" />}
        </NoWrap>
        {fileChildren.map(fileId => (
          <FileContainer
            key={fileId}
            fileId={fileId}
            parentName={name}
            path={[...path, fileId]}
          />
        ))}
      </div>
    )
  }
}

File.propTypes = forbidExtraProps({
  // passed by parent / file explorer
  // eslint-disable-next-line react/require-default-props
  parentName: or([T.string.isRequired, explicitNull()]),
  path: T.arrayOf(T.number).isRequired,

  file: T.shape(filePropTypes).isRequired,
  // Injected by React DnD:
  connectDragPreview: T.func.isRequired,
  connectDropTarget: T.func.isRequired,
  isDragging: T.bool.isRequired,

  // for wrapper
  innerRef: T.func.isRequired,
  onClick: T.func.isRequired,
})

const NoWrap = styled.div`
  white-space: nowrap;
`

export default styled(File).as.div`
  ${props => props.parentName && 'cursor: pointer;'}
  ${props => props.parentName && 'margin-left: 15px;'}
  ${props => props.file.isDirectory && 'padding: 5px 0;'}
`
