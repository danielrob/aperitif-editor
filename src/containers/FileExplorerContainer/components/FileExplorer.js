import React from 'react'
import styled from 'styled-as-components'
import theme from 'theme-proxy'

import { FileContainer } from '../containers'

const FileExplorer = ({ rootFiles }) => (
  <React.Fragment>
    {rootFiles.map(fileId => (
      <FileContainer
        key={fileId}
        fileId={fileId}
      />
    ))}
  </React.Fragment>
)

export default styled(FileExplorer).as.div`
  position: relative;
  padding: 50px 40px 0 40px;
  background-color: ${theme.colors.washedpink};
  color: ${theme.colors.darkblue}; // #545ab7
  height: 100%;
  overflow-y: auto;
`
