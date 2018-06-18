import React from 'react'
import { AddButton } from 'components'
import { connect } from 'react-redux'
import { newComponentPlease } from 'duck'

const AddComponentButton = ({ newComponentPlease, ...props }) =>
  (<AddButton
    {...props}
    onClick={e => {
      e.preventDefault()
      e.stopPropagation()
      newComponentPlease()
    }}
  />)

export default connect(null, { newComponentPlease })(AddComponentButton)
