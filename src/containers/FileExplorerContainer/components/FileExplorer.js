import T from 'prop-types'
import { forbidExtraProps } from 'airbnb-prop-types'
import React from 'react'
import styled from 'styled-as-components'
import theme from 'theme-proxy'

import { ExportAppButton } from 'components'
import { FileContainer } from '../containers'

const FileExplorer = ({ rootFiles, resetProject }) => (
  <React.Fragment>
    <ExportAppButton onClick={resetProject} position={0.1} left={0} bottom={0} text="New Project" />
    {rootFiles.map(fileId => (
      <FileContainer
        key={fileId}
        fileId={fileId}
      />
    ))}
  </React.Fragment>
)


/*
  propTypes
*/
FileExplorer.propTypes = forbidExtraProps({
  // container
  rootFiles: T.arrayOf(T.number).isRequired,
  resetProject: T.func.isRequired,
})


export default styled(FileExplorer).as.div`
  user-select: none;
  position: relative;
  padding: 50px 40px 0 40px;
  background-color: ${theme.colors.washedpink};
  color: ${theme.colors.darkblue}; // #545ab7
  height: 100%;
  overflow-y: auto;
`
