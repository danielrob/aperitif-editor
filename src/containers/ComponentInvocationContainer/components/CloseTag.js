import T from 'prop-types'
import React from 'react'

import { invocationPropTypes } from 'model-prop-types'
import { indent } from 'utils'
import { Name } from 'containers'

const CloseTag = ({ depth, invocation: { inline, nameId, closed } }) => !closed ? (
  <span>
    {!inline && indent(depth)}
    {'<'}/<Name nameId={nameId} />{'>'}
  </span>
) : null

export default CloseTag

CloseTag.propTypes = {
  depth: T.number.isRequired,
  invocation: invocationPropTypes.isRequired,
}
