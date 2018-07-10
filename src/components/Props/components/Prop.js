import T from 'prop-types'
import React from 'react'
import styled from 'styled-as-components'
import JSstringify from 'javascript-stringify'
import { declParamPropTypes } from 'model-prop-types'

import { spaces } from 'utils'
import { Name } from 'containers'
import { EyeSlashIcon } from 'components'

const Prop = ({ prop: { nameId, payload }, skipFinalComma, connectDragSource }) => (
  <React.Fragment>
    <EyeSlashIcon className="hide" />
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
  position: relative;
  cursor: pointer;
  .hide {
    position: absolute;
    top: 5px;
    left: -35px;
    color: #010431cc;
    opacity: 0.01;
    padding: 5px 8px;
    margin: -5px 8px;
    box-sizing: content-box;
    &:hover {
      opacity: 1;
    }
    transition: 0.2s ease-in;
  }
`
