import React from 'react'
import { FileExplorer, Editor } from 'containers'

import WorkspaceWrapper from './WorkspaceWrapper'

const Workspace = () => (
  <WorkspaceWrapper explorerWidth={250}>
    <FileExplorer />
    <Editor />
  </WorkspaceWrapper>
)

export default Workspace
