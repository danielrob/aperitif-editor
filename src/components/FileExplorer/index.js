import React from 'react'
import styled from 'styled-as-components'

import File from './File'

const FileExplorer = ({ files, rootFiles, changeFile, names }) =>
  rootFiles.map(fileId => (
    <File
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
  background-color: ${props => props.theme.colors.washedpink};
  color: ${props => props.theme.colors.darkblue};
`
