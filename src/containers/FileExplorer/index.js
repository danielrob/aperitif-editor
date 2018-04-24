import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-as-components'

import { File } from './components'

const FileExplorer = ({ files, rootFiles, switchFile, names }) => rootFiles.map(fileId =>
    <File
      key={fileId}
      file={files[fileId]}
      files={files}
      names={names}
      initial
      switchFile={switchFile}
    />
  )

const mapStateToProps = ({ app: { files, rootFiles, currentFileId, names } }) => ({
  files,
  names,
  rootFiles,
  currentFileId,
})

const mapDispatchToProps = dispatch => ({
  switchFile: fileId => dispatch({ type: 'CHANGE_FILE', payload: fileId }),
})

export default styled(connect(mapStateToProps, mapDispatchToProps)(FileExplorer)).as.div`
  padding: 50px 40px;
  background-color: ${props => props.theme.colors.washedpink};
  color: ${props => props.theme.colors.darkblue};
`
