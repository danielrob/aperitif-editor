import { createSelector } from 'reselect'

import { selectNames, selectInvocation, selectParams, selectInvocations } from 'selectors'

// param invocation selector => {param}
const makeSelectParamInvocation = () => createSelector(
  selectNames,
  selectParams,
  selectInvocation,
  selectInvocations,
  (names, allParams, invocation, invocations) => {
    const { id: invocationId, nameId, callParamIds, invocationIds } = invocation
    // callParamIds is a singleton for paramInvocations so e.g. allParams[[1]] is fine 🕊
    const { id, declParamId } = allParams[callParamIds]

    const { isSpreadMember } = allParams[declParamId]

    return {
      invocationId,
      callParamId: id,
      name: names[nameId],
      declIsSpreadMember: isSpreadMember,
      chainedInvocations: invocationIds.map(id => invocations[id]),
    }
  })


export default makeSelectParamInvocation
