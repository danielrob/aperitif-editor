import React from 'react'
import styled from 'styled-as-components'

import { JS, JSON_TYPE } from 'constantz'
import { ReactIcon, FolderIcon, JSONIcon } from 'components'

const FileIcon = ({ file: { name, isCurrent, type, isDirectory, containsCurrent } }) => (
  <React.Fragment>
    {isCurrent && <Pointer />}
    {type === JS && <ReactIcon />}
    {type === JSON_TYPE && <JSONIcon />}
    {isDirectory && (
      <FolderIcon open={containsCurrent && !['components', 'containers'].includes(name)} />
    )}
  </React.Fragment>
)

const Pointer = () => (
  <span role="img" aria-label="pointer" className="pointer">
    👉
  </span>
)

export default styled(FileIcon).as.span`
  .pointer {
    margin-right: -10px;
  }
`
