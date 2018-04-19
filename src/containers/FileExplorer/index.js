import React from 'react'
import { connect } from 'react-redux'

import { File, FileExplorerWrapper } from './components'

const FileExplorer = ({ files, rootFiles, switchFile, names }) => (
  <FileExplorerWrapper>
    <pre>
      {rootFiles.map(fileId => (
        <File
          key={fileId}
          file={files[fileId]}
          files={files}
          names={names}
          initial
          switchFile={switchFile}
        />
      ))}
    </pre>
  </FileExplorerWrapper>
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

export default connect(mapStateToProps, mapDispatchToProps)(FileExplorer)
