import { createSelector } from 'reselect'

import { selectNames, makeSelectInvocation, selectCallParams, selectDeclParams } from 'selectors'

// param invocation selector => {param}
const makeSelectParamInvocation = () => createSelector(
  selectNames,
  selectCallParams,
  selectDeclParams,
  makeSelectInvocation(),
  (names, callParams, declParams, invocation) => {
    const { invocationId, nameId, callParamIds, invocationIds } = invocation
    // callParamIds is a singleton for paramInvocations so e.g. allParams[[1]] is fine 🕊
    const { id, declParamId } = callParams[callParamIds]

    const { isSpreadMember } = declParams[declParamId]

    return {
      invocationId,
      callParamId: id,
      name: names[nameId],
      declIsSpreadMember: isSpreadMember,
      invocationIds,
    }
  })


export default makeSelectParamInvocation
