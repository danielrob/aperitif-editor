import T from 'prop-types'
import React from 'react'
import styled from 'styled-as-components'

import { sortProps } from '../helpers'

import { SpreadPropsContainer, PropContainer } from '../containers'

const Props = ({ params, spreadParamIds, expressionId }) => (
  <React.Fragment>
    {' '}
    {!!params.length && '({'}
    {' '}
    <span>{params.sort(sortProps).map(prop => <PropContainer key={prop.name} {...prop} />)}</span>
    <SpreadPropsContainer
      spreadParamIds={spreadParamIds}
      expressionId={expressionId}
      params={params}
    />
    {' '}
    {!!params.length && '})'}
    {' '}
  </React.Fragment>
)

export default styled(Props).as.span`
`

Props.propTypes = {
  params: T.arrayOf(T.object).isRequired,
  spreadParamIds: T.arrayOf(T.number).isRequired,
  expressionId: T.number.isRequired,
}
