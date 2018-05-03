import React from 'react'
import styled from 'styled-as-components'

import theme from 'theme-proxy'
import { spaces } from 'utils'

const Prop = ({ name, isLast, connectDragSource }) =>
  connectDragSource(
    <span
      style={{
        userSelect: 'text',
      }}
    >
      {name}
      {!isLast && `,${spaces(1)}`}
    </span>
  )

export default styled(Prop).as.div`
  display: inline-block;
  cursor: pointer;
  color: ${theme.colors.darkgreen};
`
