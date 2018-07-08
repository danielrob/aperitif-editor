import T from 'prop-types'
import { forbidExtraProps } from 'airbnb-prop-types'
import React from 'react'
import { JSX } from 'components'
import { Name, NameInput } from 'containers'
import { callParamPropTypes } from 'model-prop-types'

const CallParam = ({
  callParam: { id, valueInvocationId, declIsSpreadMember, nameId, invokeNameId, valueString },
  tagHasPropsSpread,
  spreadPropsIsOverTag,
  connectDragSource,
  isDragging,
}) =>
  connectDragSource(
    <span style={{ color: isDragging ? '#ccc' : 'inherit' }}>
      {/* Either invokes an Invocation */}
      {valueInvocationId ? (
        <span key={id}>
          {' '}
          <NameInput nameId={nameId} />={'{'}
          <JSX invocationId={valueInvocationId} inline depth={0} />
          {'}'}
        </span>
      ) : (
        /* Or a DeclParam in which case display unless its a spread member & tag has spread */
        !(declIsSpreadMember && (tagHasPropsSpread || spreadPropsIsOverTag)) && (
          <span key={id}>
            {' '}
            <NameInput nameId={nameId} />
            =
            {'{'}
            {declIsSpreadMember && 'props.'}
            {valueString || <Name nameId={invokeNameId} />}
            {'}'}
          </span>
        )
      )}
    </span>
  )

/*
  propTypes
*/
CallParam.propTypes = forbidExtraProps({
  invocationId: T.number.isRequired,
  spreadPropsIsOverTag: T.bool.isRequired,
  tagHasPropsSpread: T.bool.isRequired,
  callParam: T.shape(callParamPropTypes).isRequired,
  connectDragSource: T.func.isRequired,
})

export default CallParam
