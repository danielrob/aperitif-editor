import React from 'react'
import styled, { css } from 'styled-as-components'

import theme from 'theme-proxy'
import { PROP, PROPS_SPREAD } from 'constantz'
import { buffer } from 'styleUtils'

const OpenTag = ({
  name,
  isSupremeOver,
  isShallowOver,
  dragItem,
  paramIds,
  params,
  closed,
  hasPropsSpread,
}) => (
  <React.Fragment>
    {`<${name}`}
    {isSupremeOver && (dragItem || {}).type === PROP && !paramIds.includes(dragItem.id) && (
      <span className="new-attribute">
        {' '}
        {dragItem.name}={'{'}
        {dragItem.isSpreadMember && 'props.'}
        {dragItem.name}
        {'}'}
      </span>
      )}
    {(hasPropsSpread || (isShallowOver && (dragItem || {}).type === PROPS_SPREAD)) && (
      <span className="spread-props-attribute">
        {' {'}...props{'}'}
      </span>
      )}
    {params.map(param => !(hasPropsSpread && param.isSpreadMember) ? (
      <span key={param.id}>
        {' '}
        {param.name}
        =
        {'{'}
        {param.isSpreadMember && 'props.'}
        {param.name}
        {'}'}
      </span>
    ) : null )}
    {closed && ' /'}
    {'>'}
  </React.Fragment>
)

export default styled(OpenTag).as.span`
  ${buffer(5)}

  .new-attribute {
    color: ${theme.color.darkblue};
    ${props => props.isSupremeOver && !props.isOver && 'font-size: 14px'};
    ${props => props.isSupremeOver && !props.isOver && css`color: ${theme.color.grey};`}
    transition: 130ms;
  }
`
