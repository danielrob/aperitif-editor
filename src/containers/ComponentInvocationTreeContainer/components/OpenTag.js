import T from 'prop-types'
import React from 'react'
import styled from 'styled-as-components'

import theme from 'theme-proxy'
import { PROP, PROPS_SPREAD } from 'constantz'
import { indent } from 'utils'

import { canDropPropToOpenTag } from '../helpers'

const OpenTag = ({
  name,
  isOverOpenTag,
  dragItem,
  callParams,
  closed,
  hasPropsSpread,
  depth,
}) => {
  const spreadPropsIsOver = isOverOpenTag && dragItem.type === PROPS_SPREAD
  const propIsOver = isOverOpenTag && dragItem.type === PROP &&
    canDropPropToOpenTag(callParams, dragItem)

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
      {callParams.map(({ id, declIsSpreadMember, name }) =>
        !(hasPropsSpread && declIsSpreadMember) && (
          <span key={id}>
            {' '}
            {name}
            =
            {'{'}
            {declIsSpreadMember && 'props.'}
            {name}
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
  callParams: T.arrayOf(T.object).isRequired,
  closed: T.bool.isRequired,
  hasPropsSpread: T.bool.isRequired,
  dragItem: T.shape({ type: T.string }).isRequired,
  depth: T.number.isRequired,

  // Injected by React DnD:
  isOverOpenTag: T.bool.isRequired,
}
