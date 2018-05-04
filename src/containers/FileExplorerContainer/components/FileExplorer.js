import React from 'react'
import styled from 'styled-as-components'
import theme from 'theme-proxy'

import { FileContainer } from '../containers'

const FileExplorer = ({ rootFiles }) =>
  rootFiles.map(fileId => (
    <FileContainer
      key={fileId}
      fileId={fileId}
      initial
    />
  ))

export default styled(FileExplorer).as.div`
  padding: 50px 40px;
  background-color: ${theme.colors.washedpink};
  color: ${theme.colors.darkblue};
`
