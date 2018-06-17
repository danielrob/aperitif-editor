import React from 'react'
import styled from 'styled-as-components'
import { indent } from 'utils'

const SpreadProps = ({ isOver, params, depth, spreadParams, connectDragSource, names }) =>
  (!!spreadParams.length || isOver) ? (
    <span
      style={{
        userSelect: 'text',
      }}
      data-tip={`{ ${spreadParams.map(({ nameId }) => names[nameId]).join(', ')} }`}
      data-for="prop"
      data-delay-show="100"
    >
      {indent(depth || 1)}
      {connectDragSource(
        <div className="dragsource">
          {!!params.length && '...'}props
        </div>
      )}
      <br />
    </span>
  ) : null

export default styled(SpreadProps).as.span`
  position: relative;
  ${props => !!props.spreadParams.length && 'cursor: pointer;'}
  padding: 15px 15px 15px 0;
  margin: -15px -15px -15px 0;
  .dragsource {
    display: inline-block;
    user-select: text;
  }
`
