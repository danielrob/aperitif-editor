import { createSelector } from 'reselect'

import { selectNames, selectParams, selectInvocations } from 'selectors'

const selectInvocation = (state, props) => selectInvocations(state)[props.invocationId]

export const makeGetInvocation = () =>
  createSelector(selectNames, selectParams, selectInvocation, (names, allParams, invocation) => {
    const {
      nameOrNameId,
      invocationIds,
      paramIds,
      paramChildren,
      closed,
      hasPropsSpread,
    } = invocation

    return {
      name: names[nameOrNameId],
      invocationIds,
      paramIds,
      params: paramIds.map(id => allParams[id]),
      paramChildren: paramChildren.map(id => allParams[id]),
      closed: !!closed,
      hasPropsSpread,
    }
  })
