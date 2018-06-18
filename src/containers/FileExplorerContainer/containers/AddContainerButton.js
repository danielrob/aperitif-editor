import React from 'react'
import { AddButton } from 'components'
import { connect } from 'react-redux'
import { newContainerPlease } from 'duck'

const AddComponentButton = ({ newContainerPlease, ...props }) =>
  (<AddButton
    {...props}
    onClick={e => {
      e.preventDefault()
      e.stopPropagation()
      newContainerPlease()
    }}
  />)

export default connect(null, { newContainerPlease })(AddComponentButton)
