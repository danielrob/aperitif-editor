import T from 'prop-types'
import React from 'react'
import { indent } from 'utils'
import { declarationPropTypes } from 'model-prop-types'

import { ObjectLiteral } from 'components'

export default class ClassProperty extends React.PureComponent {
  render() {
    const { declaration: { declarationIds, invocationIds } } = this.props
    return (
      <div>
        {indent(1)}state{' = '}
        <ObjectLiteral
          declarationIds={declarationIds}
          invocationIds={invocationIds}
        />
        <br />
        <br />
      </div>
    )
  }
}

ClassProperty.propTypes = {
  thiz: T.shape({ props: T.array }).isRequired,
  declaration: declarationPropTypes.isRequired,
}
