import React from 'react'
import { Line, Keyword } from 'components'

const DefaultExport = ({ name }) =>
  name ? (
    <Line statement>
      <Keyword>export default</Keyword>
      {' '}
      {name}
    </Line>
  ) : null

export default DefaultExport
