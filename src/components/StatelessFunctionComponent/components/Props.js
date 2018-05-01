import T from 'prop-types'
import React from 'react'
import styled from 'styled-as-components'

import { sortProps } from '../helpers'

import { SpreadPropsContainer, PropContainer } from '../containers'

const Props = ({ params, spreadParamIds, expressionId }) => (
  <React.Fragment>
    <span>
      {params.sort(sortProps).map(prop => <PropContainer key={prop.name} {...prop} />)}
    </span>
    <SpreadPropsContainer
      spreadParamIds={spreadParamIds}
      expressionId={expressionId}
      params={params}
    />
  </React.Fragment>
)

export default styled(Props).as.span`
  position: relative;
`

Props.propTypes = {
  params: T.arrayOf(T.object).isRequired,
  spreadParamIds: T.arrayOf(T.number).isRequired,
  expressionId: T.number.isRequired,
}
