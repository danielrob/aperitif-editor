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
      nameOrNameId,
      type,
      invocationIds,
      paramIds,
      closed,
      hasPropsSpread,
    } = invocation

    return {
      name: names[nameOrNameId],
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
    const { nameOrNameId } = invocation
    const { id: paramId, nameId, isSpreadMember } = allParams[nameOrNameId]

    return {
      paramId,
      name: names[nameId],
      isSpreadMember,
    }
  })
