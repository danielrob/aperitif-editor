import React from 'react'
import { Props } from 'components'
import DeclParams from './DeclParams'

const PropsContainer = ({ declParamIds, ...props }) => (
  <DeclParams
    ids={declParamIds}
    render={declParams => <Props props={declParams} {...props} />}
  />
)

export default PropsContainer

