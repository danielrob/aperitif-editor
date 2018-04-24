import React from 'react'
import { fileTypes } from 'constantz'
import FileWrapper from './FileWrapper'

const File = ({ file, files, names, initial, changeFile }) => (
  <FileWrapper
    initial={initial}
    isDirectory={!!file.children.length}
    onClick={e => {
      e.stopPropagation()
      e.preventDefault()
      changeFile(file.id)
    }}
  >
    {names[file.nameId]}
    {file.suffix}
    {file.type && file.type !== fileTypes.DIR && `.${file.type}`}
    {file.children.map(fileId => (
      <File key={fileId} file={files[fileId]} files={files} names={names} changeFile={changeFile} />
    ))}
  </FileWrapper>
)

export default File
