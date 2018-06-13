import T from 'prop-types'
import React from 'react'
import styled from 'styled-as-components'
import JSstringify from 'javascript-stringify'

import theme from 'theme-proxy'
import { spaces } from 'utils'

const Prop = ({ name, isLast, payload, connectDragSource }) => (
  <React.Fragment>
    {connectDragSource(
      <span
        style={{
          userSelect: 'text',
        }}
        data-tip={JSstringify(payload, null, 2)}
        data-for="prop"
        data-delay-show="100"
      >
        {name}
      </span>
    )}
    {!isLast && `,${spaces(1)}`}
  </React.Fragment>
)

Prop.propTypes = {
  name: T.string.isRequired,
  isLast: T.bool.isRequired,
  connectDragSource: T.func.isRequired,
  declarationId: T.number.isRequired,
}

export default styled(Prop).as.div`
  display: inline-block;
  cursor: pointer;
  color: ${theme.colors.darkgreen};
`
