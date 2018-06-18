import T from 'prop-types'
import React from 'react'
import styled from 'styled-as-components'

import { indent } from 'utils'
import { paramPropTypes } from 'model-prop-types'
// import { sortProps } from './helpers' // FIXME -> needs to be deterministic

import { SpreadPropsContainer, PropContainer } from './containers'

// A param is a prop, ...is a param is a prop ♪♫♬ ♪♫♬ <- clearly got bored
const Props = ({ params, spreadParams, declarationId, depth, parentheses }) => (
  <React.Fragment>
    {' '}
    {!!params.length && parentheses && '('}
    {!!params.length && '{'}{' '}
    {!!params.length && <br />}
    <span>
      {params
        .map(param => (
          <React.Fragment key={param.nameId}>
            {indent(depth || 1)}
            <PropContainer
              {...param}
              declarationId={declarationId}
            />
            <br />
          </React.Fragment>
        ))}
      {!params.length && '()'}
    </span>
    <SpreadPropsContainer
      spreadParams={spreadParams}
      declarationId={declarationId}
      params={params}
      depth={depth}
    />{' '}
    {!!params.length && indent((depth || 1) - 1)}
    {!!params.length && '}'}
    {!!params.length && parentheses && ')'}{' '}
  </React.Fragment>
)


/* propTypes */
Props.propTypes = {
  params: T.arrayOf(T.shape(paramPropTypes)).isRequired,
  spreadParams: T.arrayOf(T.object).isRequired,
  declarationId: T.number.isRequired,
}


export default styled(Props).as.span`
`
