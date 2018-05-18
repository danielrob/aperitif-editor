import { createSelector } from 'reselect'

import { selectNames, selectParams, selectInvocations } from 'selectors'

const selectInvocation = (state, props) => selectInvocations(state)[props.invocationId]

export const makeGetInvocation = () => createSelector(
  selectNames,
  selectParams,
  selectInvocation,
  selectInvocations,
  (names, allParams, invocation, invocations) => {
    const {
      nameId,
      type,
      invocationIds,
      callParamIds,
      closed,
      hasPropsSpread,
    } = invocation

    return {
      name: names[nameId],
      type,
      childInvocations: invocationIds.map(id => invocations[id]),
      callParamIds,
      callParams: callParamIds.map(id => {
        const { declParamId } = allParams[id]
        const { nameId, isSpreadMember } = allParams[declParamId]
        return {
          id,
          name: names[nameId],
          declParamId,
          declIsSpreadMember: isSpreadMember,
        }
      }),
      closed: !!closed,
      hasPropsSpread,
    }
  })

export const makeGetParamInvocation = () => createSelector(
  selectNames,
  selectParams,
  selectInvocation,
  (names, allParams, invocation) => {
    const { nameId, callParamIds } = invocation
    // callParamIds is a singleton for paramInvocations so e.g. allParams[[1]] is fine 🕊
    const { id, declParamId } = allParams[callParamIds]
    const { isSpreadMember } = allParams[declParamId]

    return {
      id,
      name: names[nameId],
      declIsSpreadMember: isSpreadMember,
    }
  })
