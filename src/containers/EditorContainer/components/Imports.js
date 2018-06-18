import React from 'react'
import { Semi, Keyword } from 'components'

const Imports = ({ imports }) => (
  <div>
    {' '}
    {imports.map(({ isNamed, importName, source }) => (
      <React.Fragment>
        <Keyword>import</Keyword>
        {' '}
        {isNamed && '{ '}
        {importName}
        {isNamed && ' }'}
        {' '}
        <Keyword>from</Keyword> '{source}'
        <Semi />
      </React.Fragment>
    ))}{' '}
  </div>
)

export default Imports
