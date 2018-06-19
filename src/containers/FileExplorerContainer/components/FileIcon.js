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
  margin-left: -13px;
  margin-right: -7px;
  position: relative;
  bottom: -2px;
`

export default styled(FileIcon).as.span``
