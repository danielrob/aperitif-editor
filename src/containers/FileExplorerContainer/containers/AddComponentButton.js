import React from 'react'
import { AddButton } from 'components'
import { connect } from 'react-redux'
import { newComponentBundlePlease } from 'duck'
import { pDsP } from 'utils'

const AddComponentButton = ({ newComponentBundlePlease, ...props }) => (
  <AddButton
    {...props}
    onClick={pDsP(newComponentBundlePlease)}
    data-for="addComponent"
    data-tip=""
  />
)

export default connect(
  null,
  { newComponentBundlePlease }
)(AddComponentButton)
