import React from 'react'
import { Semi, Keyword } from 'components'

const Imports = ({ imports }) => (
  <div>
    {' '}
    {imports.map(({ id, isNamed, importName, source }) => (
      <React.Fragment key={id}>
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
