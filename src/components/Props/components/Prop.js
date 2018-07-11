import C from 'check-types'
import T from 'prop-types'
import React from 'react'
import styled from 'styled-as-components'
import JSstringify from 'javascript-stringify'
import { declParamPropTypes } from 'model-prop-types'

import { spaces } from 'utils'
import { Name } from 'containers'

const Prop = ({ prop: { nameId, payload }, skipFinalComma, connectDragSource }) => (
  <React.Fragment>
    {connectDragSource(
      <span
        style={{
          userSelect: 'text',
        }}
        data-tip={getDataTip(payload)}
        data-for="prop"
        data-delay-show="100"
      >
        <Name nameId={nameId} />
      </span>
    )}
    {!skipFinalComma && `,${spaces(1)}`}
  </React.Fragment>
)

Prop.propTypes = {
  declarationId: T.number.isRequired,
  skipFinalComma: T.bool.isRequired,
  prop: T.shape(declParamPropTypes).isRequired,
  connectDragSource: T.func.isRequired,
}

export default styled(Prop).as.span`
  cursor: pointer;
`

const getDataTip = payload =>
  JSstringify(payload, replacer, 2, { maxDepth: 2, maxValues: 15 })
    .replace(/undefined,\n/g, '')
    .replace(/undefined\n/g, '  ...\n')

const replacer = (value, indentation, stringify) => {
  if (C.string(value) && value.length > 70) {
    return stringify(`${value.substring(0, 70)}...`)
  }
  return stringify(value)
}
