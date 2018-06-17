import T from 'prop-types'
import React from 'react'
import styled from 'styled-as-components'

import { indent } from 'utils'
import { paramPropTypes } from 'model-prop-types'
import { sortProps } from './helpers'

import { SpreadPropsContainer, PropContainer } from './containers'

// A param is a prop, ...is a param is a prop ♪♫♬ ♪♫♬
const Props = ({ params, spreadParams, declarationId, depth }) => (
  <React.Fragment>
    {' '}
    {!!params.length && '({'}{' '}
    <br />
    <span>
      {params
        .map((param, i) => (
          <React.Fragment>
            {indent(depth || 1)}
            <PropContainer
              key={param.name}
              isLast={i === params.length - 1}
              {...param}
              declarationId={declarationId}
            />
            <br />
          </React.Fragment>
        ))}
      {!params.length && '()'}
    </span>
    <SpreadPropsContainer spreadParams={spreadParams} declarationId={declarationId} params={params} />{' '}
    {!!params.length && indent((depth || 1) - 1)}
    {!!params.length && '})'}{' '}
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
