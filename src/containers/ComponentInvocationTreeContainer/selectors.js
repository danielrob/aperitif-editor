import { createSelector } from 'reselect'

import { selectNames, selectParams, selectInvocations } from 'selectors'

const selectInvocation = (state, props) => selectInvocations(state)[props.invocationId]

// component invocation selector => <Component>
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
      pseudoSpreadPropsNameId,
      hasPropsSpread,
    } = invocation

    return {
      name: names[nameId],
      type,
      childInvocations: invocationIds.map(id => invocations[id]),
      callParamIds,
      callParams: callParamIds.map(id => {
        const { declParamId } = allParams[id]

        // literal callParam case e.g. key={name.id} or height={100}
        if (!declParamId) {
          const { id: paramId, valueNameIds, nameId } = allParams[id]
          return {
            id: paramId,
            name: names[nameId],
            valueString: valueNameIds.map(valueNameId => names[valueNameId]).join('.'),
          }
        }

        const { nameId, isSpreadMember } = allParams[declParamId]
        return {
          id,
          name: names[nameId],
          declParamId,
          declIsSpreadMember: isSpreadMember,
        }
      }),
      closed: !!closed,
      pseudoSpreadPropsName: names[pseudoSpreadPropsNameId],
      hasPropsSpread,
    }
  })

// param invocation selector => {param}
export const makeGetParamInvocation = () => createSelector(
  selectNames,
  selectParams,
  selectInvocation,
  selectInvocations,
  (names, allParams, invocation, invocations) => {
    const { nameId, callParamIds, invocationIds } = invocation
    // callParamIds is a singleton for paramInvocations so e.g. allParams[[1]] is fine 🕊
    const { id, declParamId } = allParams[callParamIds]

    const { isSpreadMember } = allParams[declParamId]

    return {
      id,
      name: names[nameId],
      declIsSpreadMember: isSpreadMember,
      chainedInvocations: invocationIds.map(id => invocations[id])
    }
  })
