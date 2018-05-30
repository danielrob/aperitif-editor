import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-as-components'

import { updatePreferences } from 'duck'
import { selectPreferences } from 'selectors'

const Line = ({ children, semis, statement, updatePreferences }) => (
  <React.Fragment>
    {children}
    <span
      className="semi"
      onClick={() => updatePreferences({ semis: !semis })}
    >
      {semis && statement && ';'}
    </span>
  </React.Fragment>
)

const mapStateToProps = state => selectPreferences(state)
const mapDispatchToProps = { updatePreferences }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(styled(Line).as.div`
  .semi {
    cursor: pointer;
    ${props => !props.semis && 'padding-right: 10px;'}
  }
`)
