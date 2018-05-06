import T from 'prop-types'
import { forbidExtraProps } from 'airbnb-prop-types'
import React from 'react'
import styled from 'styled-as-components'
import theme from 'theme-proxy'

const ParamInvocation = ({ isSpreadMember, name }) => (
  <React.Fragment>
    {'{'}
    <span className="prop-as-child">
      {isSpreadMember && 'props.'}
      {name}
    </span>
    {'}'}
  </React.Fragment>
)

export default styled(ParamInvocation).as.div`
  display: inline-block;
  color: ${theme.colors.darkblue}
`

ParamInvocation.propTypes = forbidExtraProps({
  name: T.string.isRequired,
  isSpreadMember: T.bool.isRequired,

  innerRef: T.func.isRequired, // eslint-disable-line react/no-unused-prop-types
})
