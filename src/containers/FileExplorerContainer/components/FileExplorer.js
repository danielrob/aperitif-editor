import T from 'prop-types'
import { forbidExtraProps } from 'airbnb-prop-types'
import React from 'react'
import styled from 'styled-as-components'
import theme from 'theme-proxy'

import { ExportAppButton, HumanEditUndoIcon, HumanEditRedoIcon } from 'components'
import { FileContainer } from '../containers'

const FileExplorer = ({ rootFiles, resetProject, undo, redo }) => (
  <React.Fragment>
    <ExportAppButton
      onClick={resetProject}
      fixed
      left={2}
      bottom={15}
      text="New Project"
    />
    <ExportAppButton onClick={undo} fixed left={200} bottom={15} text={<HumanEditUndoIcon />} />
    <ExportAppButton onClick={redo} fixed left={230} bottom={15} text={<HumanEditRedoIcon />} />
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
  undo: T.func.isRequired,
  redo: T.func.isRequired,
})


export default styled(FileExplorer).as.div`
  user-select: none;
  position: relative;
  padding: 50px 40px 60px 40px;
  background-color: ${theme.colors.washedpink};
  color: ${theme.colors.darkblue}; // #545ab7
  height: 100%;
  overflow-y: auto;
`
