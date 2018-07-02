import React from 'react'
import styled from 'styled-as-components'
import { FileExplorerContainer, EditorContainer } from 'containers'

import Divider from './Divider'
import Embed from './Embed'

const Workspace = ({
  workspaceActions,
  handleDividerMouseDown,
  handleEmbedDividerMouseDown,
  width,
  embedWidth,
}) => (
  <React.Fragment>
    <FileExplorerContainer />
    <Divider width={width} onMouseDown={handleDividerMouseDown} />
    <EditorContainer workspaceActions={workspaceActions} hasEmbed={!!embedWidth} />
    <Divider
      width={document.body.clientWidth - embedWidth}
      onMouseDown={handleEmbedDividerMouseDown}
    />
    <Embed />
  </React.Fragment>
)

export default styled(Workspace).as.div`
  & > div {
    position: absolute;
    bottom: 0;
  }
  & > div:first-child {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: ${props => props.width}px;
  }
  & > div:nth-child(3) {
    top: 0;
    left: ${props => props.width}px;
    right: ${props => props.embedWidth}px;
  }
  & > div:last-child {
    top: 0;
    left: ${props => document.body.clientWidth - props.embedWidth}px;
    right: 0;
  }
`
