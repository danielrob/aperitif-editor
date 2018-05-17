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
      paramIds,
      closed,
      hasPropsSpread,
    } = invocation

    return {
      name: names[nameId],
      type,
      childInvocations: invocationIds.map(id => invocations[id]),
      paramIds,
      params: paramIds.map(id => ({
        name: names[allParams[id].nameId],
        ...allParams[id],
      })),
      closed: !!closed,
      hasPropsSpread,
    }
  })

export const makeGetParamInvocation = () => createSelector(
  selectNames,
  selectParams,
  selectInvocation,
  (names, allParams, invocation) => {
    const { nameId } = invocation
    const { id: paramId, isSpreadMember } = allParams[nameId]

    return {
      paramId,
      name: names[nameId],
      isSpreadMember,
    }
  })
