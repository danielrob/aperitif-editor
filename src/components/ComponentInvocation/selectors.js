import { createSelector } from 'reselect'

import { selectNames, selectInvocations } from 'containers/App/selectors'

const selectInvocation = (state, props) => selectInvocations(state)[props.invocationId]

export const makeGetInvocation = () => createSelector(
  selectNames,
  selectInvocation,
  (names, invocation) => {
    const { id, nameOrNameId, invocationIds } = invocation
    return { id, name: names[nameOrNameId], invocationIds }
  }
)

