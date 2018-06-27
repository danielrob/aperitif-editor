import React from 'react'
import { PropTypes } from 'components'
import DeclParams from './DeclParams'

const PropTypesContainer = ({ declParamIds, ...props }) => (
  <DeclParams
    ids={declParamIds}
    render={declParams => <PropTypes props={declParams} {...props} />}
  />
)

export default PropTypesContainer

