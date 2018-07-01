import React from 'react'
import { Semi, Keyword } from 'components'

const Imports = ({ imports }) =>
  imports.map(({ id, isNamed, importName, source }) => (
    <React.Fragment key={id}>
      <Keyword>import</Keyword> {isNamed && '{ '}
      {importName}
      {isNamed && ' }'} <Keyword>from</Keyword> '{source}'
      <Semi />
    </React.Fragment>
  )).concat(!!imports.length && <br key="br" />)

export default Imports
