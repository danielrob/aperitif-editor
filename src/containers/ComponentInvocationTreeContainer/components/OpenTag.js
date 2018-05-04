import React from 'react'
import styled, { css } from 'styled-as-components'

import theme from 'theme-proxy'
import { PROP, PROPS_SPREAD } from 'constantz'
import { indent } from 'utils'
import { buffer } from 'styleUtils'

const OpenTag = ({
  name,
  isOverCI,
  isOverOpenTag,
  dragItem,
  paramIds,
  params,
  closed,
  hasPropsSpread,
  depth,
}) => {
  const spreadPropsIsOver = isOverOpenTag && dragItem.type === PROPS_SPREAD
  const propIsOver = isOverCI && dragItem.type === PROP && !paramIds.includes(dragItem.id)

  return (
    <React.Fragment>
      {indent(depth)}{`<${name}`}
      {propIsOver && (
        <span className="new-attribute-preview">
          {' '}
          {dragItem.name}={'{'}
          {dragItem.isSpreadMember && 'props.'}
          {dragItem.name}
          {'}'}
        </span>
        )}
      {(hasPropsSpread || spreadPropsIsOver) && (
        <span className="spread-props-attribute">
          {' {'}...props{'}'}
        </span>
        )}
      {params.map(param => !(hasPropsSpread && param.isSpreadMember) && (
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
}

export default styled(OpenTag).as.span.attrs({ style: { userSelect: 'text' } })`
  ${buffer(5)}

  .new-attribute-preview {
    color: ${theme.color.darkblue};
    ${props => props.isOverCIButNotOpenTag && 'font-size: 14px'};
    ${props => props.isOverCIButNotOpenTag && css`color: ${theme.color.grey};`}
    transition: 130ms;
  }
`
