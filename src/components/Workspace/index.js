import React from 'react'
import styled from 'styled-as-components'
import { FileExplorerContainer, EditorContainer } from 'containers'

const Workspace = () => (
  <React.Fragment>
    <FileExplorerContainer />
    <EditorContainer />
  </React.Fragment>
)

const width = 290

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
    width: ${width}px;
  }
  & > div:last-child {
    top: 0;
    left: ${width}px;
    right: 0;
  }
`
