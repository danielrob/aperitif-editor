import React from 'react'
import { Line, Keyword } from 'components'

const Imports = ({ imports }) => (
  <div>
    {' '}
    {imports.map(({ id, isNamed, importName, source }) => (
      <Line statement key={id}>
        <Keyword>import</Keyword>
        {' '}
        {isNamed && '{ '}
        {importName}
        {isNamed && ' }'}
        {' '}
        <Keyword>from</Keyword> '{source}'
      </Line>
    ))}{' '}
  </div>
)

export default Imports
