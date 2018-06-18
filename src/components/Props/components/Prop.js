import T from 'prop-types'
import React from 'react'
import styled from 'styled-as-components'
import JSstringify from 'javascript-stringify'
import { paramPropTypes } from 'model-prop-types'

import { spaces } from 'utils'
import { Name } from 'containers'

const Prop = ({ prop: { nameId, payload }, isLast, connectDragSource }) => (
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
    {!isLast && `,${spaces(1)}`}
  </React.Fragment>
)

Prop.propTypes = {
  declarationId: T.number.isRequired,
  isLast: T.bool.isRequired,
  prop: T.shape(paramPropTypes).isRequired,
  connectDragSource: T.func.isRequired,
}

export default styled(Prop).as.div`
  display: inline-block;
  cursor: pointer;
`
