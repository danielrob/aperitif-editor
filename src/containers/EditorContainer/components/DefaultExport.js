import React from 'react'
import { Semi, Keyword, Input } from 'components'

const DefaultExport = ({ nameId }) =>
  nameId ? (
    <React.Fragment>
      <Keyword>export default</Keyword>
      {' '}
      <Input nameId={nameId} />
      <Semi />
    </React.Fragment>
  ) : null

export default DefaultExport
