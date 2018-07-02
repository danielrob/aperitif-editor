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
        data-tip={JSstringify(payload, null, 2, { maxDepth: 2, maxValues: 10 })}
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
