import React from 'react'
import styled from 'styled-as-components'
import { SEMIS } from 'constantz'

const Line = ({ children, statement }) => (
  <React.Fragment>
    {children}
    {SEMIS && statement && ';'}
  </React.Fragment>
)

export default styled(Line).as.div``
