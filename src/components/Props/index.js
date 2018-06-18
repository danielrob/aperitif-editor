import T from 'prop-types'
import { forbidExtraProps } from 'airbnb-prop-types'
import React from 'react'
import styled from 'styled-as-components'
import { partition } from 'lodash'

import { indent } from 'utils'
import { paramPropTypes } from 'model-prop-types'

import { SpreadPropsContainer, PropContainer } from './containers'

// A param is a prop, ...is a param is a prop ♪♫♬ ♪♫♬ <- clearly got bored
const Props = ({ props, declarationId, depth, parentheses }) => {
  const [spreadProps, params] = partition(props, p => p.isSpreadMember)
  const hasProps = !!params.length
  const inline = params.length < 5
  return (
    <React.Fragment>
      {' '}
      {hasProps && parentheses && '('}
      {hasProps && '{'}{' '}
      {hasProps && !inline && <br />}
      <span>
        {params
          .map((param, index) => (
            <React.Fragment key={param.nameId}>
              {!inline && indent(depth || 1)}
              <PropContainer
                prop={param}
                declarationId={declarationId}
                isLast={index === params.length - 1}
              />
              {!inline && <br />}
            </React.Fragment>
          ))}
        {!hasProps && '()'}
      </span>
      <SpreadPropsContainer
        spreadProps={spreadProps}
        declarationId={declarationId}
        params={params}
        depth={depth}
        inline={inline}
      />{' '}
      {hasProps && !inline && indent((depth || 1) - 1)}
      {hasProps && '}'}
      {hasProps && parentheses && ')'}{' '}
    </React.Fragment>
  )
}


/* propTypes */
Props.propTypes = forbidExtraProps({
  props: T.arrayOf(T.shape(paramPropTypes)).isRequired,
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
