import React from 'react'
import { AddButton } from 'components'
import { connect } from 'react-redux'
import { openAPIInputScreen } from 'duck'

const AddComponentButton = ({ openAPIInputScreen, ...props }) =>
  (<AddButton
    {...props}
    onClick={e => {
      e.preventDefault()
      e.stopPropagation()
      openAPIInputScreen()
    }}
  />)

export default connect(null, { openAPIInputScreen })(AddComponentButton)
