import T from 'prop-types'
import React from 'react'

import { invocationPropTypes } from 'model-prop-types'
import { indent } from 'utils'

const CloseTag = ({ depth, invocation: { inline, name, closed } }) => !closed ? (
  <span>
    {!inline && indent(depth)}
    {'<'}/{name}{'>'}
  </span>
) : null

export default CloseTag

CloseTag.propTypes = {
  depth: T.number.isRequired,
  invocation: invocationPropTypes.isRequired,
}
