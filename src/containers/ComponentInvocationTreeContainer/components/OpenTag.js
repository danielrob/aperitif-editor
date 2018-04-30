import React from 'react'
import styled, { css } from 'styled-as-components'
import theme from 'theme-proxy'
import { buffer } from 'styleUtils'

const OpenTag = ({ name, isSupremeOver, dragItem, paramIds, params, closed }) => (
  isSupremeOver && dragItem && !paramIds.includes(dragItem.id) ?
    <React.Fragment>
      {`<${name} `}
      <span className="new-prop">
        {`${dragItem.name}={${dragItem.name}}`}
      </span>
      {params.map(param => <span key={param.id} className="param">{` ${param.name}={${param.name}}`}</span>)}
      {closed && ' /'}{'>'}
    </React.Fragment> :
    <React.Fragment>
      {`<${name}`}
      {params.map(param => <span key={param.id} className="param">{` ${param.name}={${param.name}}`}</span>)}
      {closed && ' /'}{'>'}
    </React.Fragment>
)

export default styled(OpenTag).as.span`
  width: 100%;
  ${buffer(5)}

  .new-prop {
    color: ${theme.color.darkblue};
    ${props => props.isSupremeOver && !props.isOver && 'font-size: 14px'};
    ${props => props.isSupremeOver && !props.isOver && css`color: ${theme.color.grey};`}
    transition: 130ms;
  }
`
