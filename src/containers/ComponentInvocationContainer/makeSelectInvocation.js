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
        const { declParamId, nameId, ...callParam } = callParams[id]

        // A call param is either an 'invocation' of a declaration param
        if (declParamId) {
          const { nameId: declParamNameId, isSpreadMember } = declParams[declParamId]
          return {
            id,
            name: names[nameId || declParamNameId].value,
            nameId: nameId || declParamNameId,
            invokeNameId: declParamNameId,
            declParamId,
            declIsSpreadMember: isSpreadMember,
          }
        }

        // or it has a valueInvocationId and will have it's nameId set properly.
        return {
          id,
          nameId,
          name: names[nameId].value,
          ...callParam,
        }
      }),
      inline,
      closed: !!closed,
      pseudoSpreadPropsName: pseudoSpreadPropsNameId ? names[pseudoSpreadPropsNameId].value : null,
      hasPropsSpread,
    }
  })

export default makeSelectInvocation
