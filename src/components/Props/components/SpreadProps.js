import React from 'react'
import styled from 'styled-as-components'
import { indent } from 'utils'

const SpreadProps = ({ isOver, props, depth, spreadProps, connectDragSource, names, inline }) =>
  (!!spreadProps.length || isOver) ? (
    <span
      style={{
        userSelect: 'text',
      }}
      data-tip={`{ ${spreadProps.map(({ nameId }) => names[nameId].value).join(', ')} }`}
      data-for="prop"
      data-delay-show="100"
    >
      {!inline && indent(depth || 1)}
      {inline && ', '}
      {connectDragSource(
        <div className="dragsource">
          {!!props.length && '...'}props
        </div>
      )}
      {!inline && <br />}
    </span>
  ) : null

export default styled(SpreadProps).as.span`
  position: relative;
  ${props => !!props.spreadProps.length && 'cursor: pointer;'}
  padding: 15px 15px 15px 0;
  margin: -15px -15px -15px 0;
  .dragsource {
    display: inline-block;
    user-select: text;
  }
`
