import T from 'prop-types'
import React from 'react'
import styled from 'styled-as-components'

import { paramPropTypes } from 'model-prop-types'
import { sortProps } from './helpers'

import { SpreadPropsContainer, PropContainer } from './containers'

// A param is a prop, ...is a param is a prop ♪♫♬ ♪♫♬
const Props = ({ params, spreadParams, declarationId }) => (
  <React.Fragment>
    {' '}
    {!!params.length && '({'}{' '}
    <span>
      {params
        .sort(sortProps)
        .map((param, i) => (
          <PropContainer
            key={param.name}
            isLast={i === params.length - 1}
            {...param}
            declarationId={declarationId}
          />
        ))}
      {!params.length && '()'}
    </span>
    <SpreadPropsContainer spreadParams={spreadParams} declarationId={declarationId} params={params} />{' '}
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
