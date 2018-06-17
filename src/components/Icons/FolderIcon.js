/*
  Icons: https://material.io/tools/icons/?icon=folder_open&style=baseline
  Apache license version 2.0
*/

import React from 'react'

const FolderIcon = props =>
  props.open ? (
    <svg xmlns="http://www.w3.org/2000/svg" {...props} viewBox="0 0 24 24">
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 12H4V8h16v10z" />
    </svg>
  ) : (
    <svg xmlns="http://www.w3.org/2000/svg" {...props} viewBox="0 0 24 24">
      <path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z" />
      <path d="M0 0h24v24H0z" fill="none" />
    </svg>
  )

FolderIcon.defaultProps = {
  width: '14px',
  style: {
    marginRight: '3px',
    marginBottom: '3px',
    color: '#2f3267',
  },
}

export default FolderIcon
