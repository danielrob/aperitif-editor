import T from 'prop-types'
import { forbidExtraProps } from 'airbnb-prop-types'
import React from 'react'
import styled from 'styled-as-components'
import { partition } from 'lodash'

import { PROP } from 'constantz'
import { StopDropTarget } from 'containers'
import { indent } from 'utils'
import { declParamPropTypes } from 'model-prop-types'

import { SpreadPropsContainer, PropDragContainer } from './containers'

const Props = ({ props: allProps, declarationId, depth, parentheses }) => {

  const [spreadProps, props] = partition(allProps, p => p.isSpreadMember)
  const hasProps = !!props.length
  const inline = props.length < 5
  return (
    <StopDropTarget type={PROP}>
      {' '}
      {hasProps && parentheses && '('}
      {hasProps && '{'}{' '}
      {hasProps && !inline && <br />}
      <span>
        {props
          .map((prop, index) => (
            <React.Fragment key={prop.nameId}>
              {!inline && indent(depth || 1)}
              <PropDragContainer
                prop={prop}
                declarationId={declarationId}
                isLast={index === props.length - 1}
              />
              {!inline && <br />}
            </React.Fragment>
          ))}
        {!hasProps && '()'}
      </span>
      <SpreadPropsContainer
        spreadProps={spreadProps}
        declarationId={declarationId}
        props={props}
        depth={depth}
        inline={inline}
      />{' '}
      {hasProps && !inline && indent((depth || 1) - 1)}
      {hasProps && '}'}
      {hasProps && parentheses && ')'}{' '}
    </StopDropTarget>
  )
}


/* propTypes */
Props.propTypes = forbidExtraProps({
  props: T.arrayOf(T.shape(declParamPropTypes)).isRequired,
  declarationId: T.number.isRequired,
  depth: T.number,
  parentheses: T.bool,
})

Props.defaultProps = {
  depth: 0,
  parentheses: false,
}

export default styled(Props).as.span`
`
