import React from 'react'
import { FileExplorer, Editor } from 'containers'

import WorkspaceWrapper from './WorkspaceWrapper'

const Workspace = () => (
  <WorkspaceWrapper explorerWidth={290}>
    <FileExplorer />
    <Editor />
  </WorkspaceWrapper>
)

export default Workspace
