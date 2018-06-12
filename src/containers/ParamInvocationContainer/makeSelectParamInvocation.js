import { createSelector } from 'reselect'

import { selectNames, selectInvocation, selectParams } from 'selectors'

// param invocation selector => {param}
const makeSelectParamInvocation = () => createSelector(
  selectNames,
  selectParams,
  selectInvocation,
  (names, allParams, invocation) => {
    const { invocationId, nameId, callParamIds, invocationIds } = invocation
    // callParamIds is a singleton for paramInvocations so e.g. allParams[[1]] is fine 🕊
    const { id, declParamId } = allParams[callParamIds]

    const { isSpreadMember } = allParams[declParamId]

    return {
      invocationId,
      callParamId: id,
      name: names[nameId],
      declIsSpreadMember: isSpreadMember,
      invocationIds,
    }
  })


export default makeSelectParamInvocation
