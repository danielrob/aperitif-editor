import React from 'react'
import styled from 'styled-as-components'

const SpreadProps = ({ isOver, params, spreadParams, connectDragSource }) =>
  (!!spreadParams.length || isOver) ? (
    <span>
      {!!params.length && ', '}
      {connectDragSource(
        <div className="dragsource">
          {!!params.length && '...'}props
        </div>
      )}
    </span>
  ) : null

export default styled(SpreadProps).as.span`
  position: relative;
  ${props => !!props.spreadParams.length && 'cursor: pointer;'}
  padding: 25px 50px 25px 0;
  margin: -25px -50px -25px 0;
  color: ${props => (props.isOver ? props.theme.colors.darkblue : props.theme.colors.darkgreen)}
  .dragsource {
    display: inline-block;
    user-select: text;
  }
`
