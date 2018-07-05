import React from 'react'
import { AddButton } from 'components'
import { connect } from 'react-redux'
import { openAPIInputScreen } from 'duck'
import { pDsP } from 'utils'

const AddContainerButton = ({ openAPIInputScreen, ...props }) => (
  <AddButton {...props} onClick={pDsP(openAPIInputScreen)} />
)

export default connect(null, { openAPIInputScreen })(AddContainerButton)
