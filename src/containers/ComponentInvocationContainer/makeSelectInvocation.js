import { createSelector } from 'reselect'

import { selectNames, selectInvocation, selectParams } from 'selectors'

// component invocation selector => <Component>
const makeSelectInvocation = () => createSelector(
  selectNames,
  selectParams,
  selectInvocation,
  (names, allParams, invocation) => {
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
      invocationIds,
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

export default makeSelectInvocation
