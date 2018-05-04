import React from 'react'
import styled from 'styled-as-components'
import theme from 'theme-proxy'

import { FileContainer } from '../containers'

const FileExplorer = ({ files, rootFiles, changeFile, names }) =>
  rootFiles.map(fileId => (
    <FileContainer
      key={fileId}
      file={files[fileId]}
      files={files}
      names={names}
      initial
      changeFile={changeFile}
    />
  ))

export default styled(FileExplorer).as.div`
  padding: 50px 40px;
  background-color: ${theme.colors.washedpink};
  color: ${theme.colors.darkblue};
`
