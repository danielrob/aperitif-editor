import { createSelector } from 'reselect'

import { selectNames, selectParams, selectInvocations } from 'selectors'

const selectInvocation = (state, props) => selectInvocations(state)[props.invocationId]

export const makeGetInvocation = () => createSelector(
  selectNames,
  selectParams,
  selectInvocation,
  (names, allParams, invocation) => {
    const { id, nameOrNameId, invocationIds, paramIds } = invocation

    return {
      id,
      name: names[nameOrNameId],
      invocationIds,
      paramIds,
      params: paramIds.map(id => allParams[id]),
    }
  }
)

