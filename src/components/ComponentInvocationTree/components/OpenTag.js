import React from 'react'
import styled from 'styled-as-components'
import { buffer } from 'styleUtils'

const ComponentInvocationOpen = ({ name, isSupremeOver, dragItem }) => (
  isSupremeOver ?
    <React.Fragment>
      {`<${name} `}
      <span className="new-prop">
        {`${dragItem.name}={${dragItem.name}}`}
      </span>
      {'>'}
    </React.Fragment> :
    `<${name}>`
)

export default styled(ComponentInvocationOpen).as.span`
  width: 100%;
  ${buffer(30)}
  .new-prop {
    ${props => props.isSupremeOver && !props.isOver && 'font-size: 14px'};
    ${props => props.isSupremeOver && !props.isOver && 'color: #ccc;'}
    transition: color 50ms, font-size 50ms;
  }
`
