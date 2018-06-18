import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-as-components'

import { updatePreferences } from 'duck'
import { selectPreferences } from 'selectors'

const Semi = ({ semis }) => (
  <React.Fragment>
    {semis && ';'}
    <br />
  </React.Fragment>
)

const mapStateToProps = state => selectPreferences(state)
const mapDispatchToProps = { updatePreferences }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(styled(Semi).as.span.attrs({
  onClick: props => () => props.updatePreferences({ semis: !props.semis }),
})`
  cursor: pointer;
  ${props => !props.semis && 'padding-left: 10px;'}
`)
