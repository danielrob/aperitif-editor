import T from 'prop-types'
import React from 'react'
import styled from 'styled-as-components'

import theme from 'theme-proxy'
import { PROP, PROPS_SPREAD } from 'constantz'
import { indent } from 'utils'

const OpenTag = ({
  name,
  isOverOpenTag,
  dragItem,
  paramIds,
  params,
  closed,
  hasPropsSpread,
  depth,
}) => {
  const spreadPropsIsOver = isOverOpenTag && dragItem.type === PROPS_SPREAD
  const propIsOver = isOverOpenTag && dragItem.type === PROP && !paramIds.includes(dragItem.id)

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

export default styled(OpenTag).as.div.attrs({ style: { userSelect: 'text' } })`
  .new-attribute-preview {
    color: ${theme.color.darkgreen};
    transition: 250ms;
  }
`

OpenTag.propTypes = {
  name: T.string.isRequired,
  paramIds: T.arrayOf(T.number).isRequired,
  params: T.arrayOf(T.object).isRequired,
  closed: T.bool.isRequired,
  hasPropsSpread: T.bool.isRequired,
  dragItem: T.shape({ type: T.string }).isRequired,
  depth: T.number.isRequired,

  // Injected by React DnD:
  isOverOpenTag: T.bool.isRequired,
}
