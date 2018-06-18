import { createSelector } from 'reselect'

import { selectNames, makeSelectInvocation as msI, selectCallParams, selectDeclParams } from 'selectors'

// component invocation selector => <Component>
const makeSelectInvocation = () => createSelector(
  selectNames,
  selectCallParams,
  selectDeclParams,
  msI(),
  (names, callParams, declParams, invocation) => {
    const {
      invocationId,
      nameId,
      type,
      invocationIds,
      callParamIds,
      inline,
      closed,
      pseudoSpreadPropsNameId,
      hasPropsSpread,
    } = invocation

    return {
      invocationId,
      nameId,
      type,
      invocationIds,
      callParams: callParamIds.map(id => {
        const { declParamId } = callParams[id]

        // literal callParam case e.g. key={name.id} or height={100}
        if (!declParamId) {
          const { id: paramId, valueNameIds, nameId } = callParams[id]
          return {
            id: paramId,
            nameId,
            valueString: valueNameIds.map(valueNameId => names[valueNameId].value).join('.'),
          }
        }

        const { nameId, isSpreadMember } = declParams[declParamId]
        return {
          id,
          nameId,
          declParamId,
          declIsSpreadMember: isSpreadMember,
        }
      }),
      inline,
      closed: !!closed,
      pseudoSpreadPropsName: (names[pseudoSpreadPropsNameId] || {}).value,
      hasPropsSpread,
    }
  })

export default makeSelectInvocation
