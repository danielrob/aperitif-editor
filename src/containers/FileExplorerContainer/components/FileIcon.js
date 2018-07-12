import React from 'react'
import styled from 'styled-as-components'

import { JS, SC, JSON_TYPE } from 'constantz'
import { ReactIcon, FolderIcon, JSONIcon, SCIcon } from 'components'

const FileIcon = ({ file: { name, isCurrent, type, isDirectory, containsCurrent } }) => (
  <React.Fragment>
    {isCurrent && <Pointer />}
    {type === JS && <ReactIcon />}
    {type === SC && <SCIcon />}
    {type === JSON_TYPE && <JSONIcon />}
    {isDirectory && (
      <FolderIcon open={containsCurrent && !['components', 'containers'].includes(name)} />
    )}
  </React.Fragment>
)

const Pointer = styled.span.attrs({
  children: '👉',
})`
  margin-left: -25px;
  margin-right: 2px;
  position: relative;
  bottom: -2px;
  font-size: 20px;
  display: inline-block;
  margin-top: -4px;
  margin-bottom: -4px;
`

export default styled(FileIcon).as.span``
