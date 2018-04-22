import React from 'react'
import { Line, Keyword } from 'components'

const Imports = ({ imports }) =>
  <div> {
  imports.map(imp => (
    <Line statement key={imp.id}>
      <Keyword>import</Keyword> {imp.importName} <Keyword>from</Keyword> '{imp.source}'
    </Line>
  ))
  } </div>

export default Imports
