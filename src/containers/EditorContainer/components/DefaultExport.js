import React from 'react'
import { Semi, Keyword } from 'components'
import { NameInput } from 'containers'

const DefaultExport = ({ nameId }) =>
  nameId ? (
    <React.Fragment>
      <Keyword>export default</Keyword>
      {' '}
      <NameInput nameId={nameId} />
      <Semi />
    </React.Fragment>
  ) : null

export default DefaultExport
