import React from 'react'
import styled, { css } from 'styled-as-components'
import theme from 'theme-proxy'
import { buffer } from 'styleUtils'

const OpenTag = ({ name, isSupremeOver, dragItem, paramIds, params, closed }) => (
  <React.Fragment>
    {`<${name}`}
    {isSupremeOver && dragItem && !paramIds.includes(dragItem.id) && (
      <span className="new-prop">
        {' '}
        {dragItem.name}={'{'}
        {dragItem.isSpreadMember && 'props.'}
        {dragItem.name}
        {'}'}
      </span>
      )}
    {params.map(param => (
      <span key={param.id}>
        {' '}
        {param.name}
        =
        {'{'}
        {param.isSpreadMember && 'props.'}
        {param.name}
        {'}'}
      </span>
    ))}
    {closed && ' /'}
    {'>'}
  </React.Fragment>
)

export default styled(OpenTag).as.span`
  ${buffer(5)}

  .new-prop {
    color: ${theme.color.darkblue};
    ${props => props.isSupremeOver && !props.isOver && 'font-size: 14px'};
    ${props => props.isSupremeOver && !props.isOver && css`color: ${theme.color.grey};`}
    transition: 130ms;
  }
`
