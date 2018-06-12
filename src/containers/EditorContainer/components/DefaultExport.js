import React from 'react'
import { Line, Keyword, Input } from 'components'

const DefaultExport = ({ nameId }) =>
  nameId ? (
    <Line statement>
      <Keyword>export default</Keyword>
      {' '}
      <Input nameId={nameId} />
    </Line>
  ) : null

export default DefaultExport
