import { createSelector } from 'reselect'

import { selectNames, selectParams, selectInvocations } from 'selectors'

const selectInvocation = (state, props) => selectInvocations(state)[props.invocationId]

// param invocation selector => {param}
export const makeSelectParamInvocation = () => createSelector(
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
