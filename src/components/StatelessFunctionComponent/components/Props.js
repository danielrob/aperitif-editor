import T from 'prop-types'
import React from 'react'
import styled from 'styled-as-components'

import { sortProps } from '../helpers'

import { SpreadPropsContainer, PropContainer } from '../containers'

const Props = ({ params, spreadParams, expressionId }) => (
  <React.Fragment>
    {' '}
    {!!params.length && '({'}{' '}
    <span>
      {params
        .sort(sortProps)
        .map((prop, i) => (
          <PropContainer key={prop.name} isLast={i === params.length - 1} {...prop} />
        ))}
    </span>
    <SpreadPropsContainer spreadParams={spreadParams} expressionId={expressionId} params={params} />{' '}
    {!!params.length && '})'}{' '}
  </React.Fragment>
)

export default styled(Props).as.span`
`

Props.propTypes = {
  params: T.arrayOf(T.object).isRequired,
  spreadParams: T.arrayOf(T.object).isRequired,
  expressionId: T.number.isRequired,
}
