import { createSelector } from 'reselect'

import { selectNames, selectParams, selectInvocations } from 'selectors'

const selectInvocation = (state, props) => selectInvocations(state)[props.invocationId]

// component invocation selector => <Component>
export const makeSelectInvocation = () => createSelector(
  selectNames,
  selectParams,
  selectInvocation,
  selectInvocations,
  (names, allParams, invocation, invocations) => {
    const {
      id,
      nameId,
      type,
      invocationIds,
      callParamIds,
      inline,
      closed,
      pseudoSpreadPropsNameId,
      hasPropsSpread,
    } = invocation

    return {
      invocationId: id,
      nameId,
      name: names[nameId],
      type,
      childInvocations: invocationIds.map(id => invocations[id]),
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
      inline,
      closed: !!closed,
      pseudoSpreadPropsName: names[pseudoSpreadPropsNameId],
      hasPropsSpread,
    }
  })
