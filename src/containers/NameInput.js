import T from 'prop-types'
import React from 'react'
import { Input } from 'components'
import Name from './Name'

const NameInput = props => (
  <Name
    nameId={props.nameId}
    render={(name, onChange) => <Input value={name} onChange={onChange} {...props} />}
  />
)

NameInput.propTypes = {
  nameId: T.number.isRequired,
}

export default NameInput
