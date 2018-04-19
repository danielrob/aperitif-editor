import React from 'react'
import { fileTypes } from 'constantz'
import FileWrapper from './FileWrapper'

const File = ({ file, files, names, initial, switchFile }) => (
  <FileWrapper
    initial={initial}
    isDirectory={!!file.children.length}
    onClick={e => {
      e.stopPropagation()
      e.preventDefault()
      switchFile(file.id)
    }}
  >
    {names[file.nameId]}
    {file.suffix}
    {file.type && file.type !== fileTypes.DIR && `.${file.type}`}
    {file.children.map(fileId => (
      <File key={fileId} file={files[fileId]} files={files} names={names} switchFile={switchFile} />
    ))}
  </FileWrapper>
)

export default File
