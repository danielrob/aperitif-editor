import { createSelector } from 'reselect'

import { selectNames, makeSelectInvocation as msI, selectCallParams, selectDeclParams } from 'selectors'

// component invocation selector => <Component>
const makeSelectInvocation = () => createSelector(
  selectNames,
  selectCallParams,
  selectDeclParams,
  msI(),
  (names, callParams, declParams, invocation) => {
    const {
      invocationId,
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
      invocationId,
      nameId,
      type,
      invocationIds,
      callParams: callParamIds.map(id => {
        const { declParamId, nameId, ...callParam } = callParams[id]

        // literal callParam case e.g. key={name.id} or height={100}
        if (declParamId) {
          const { nameId: fallbackNameId, isSpreadMember } = declParams[declParamId]
          return {
            id,
            name: names[nameId || fallbackNameId].value,
            nameId: nameId || fallbackNameId,
            invokeNameId: fallbackNameId,
            declParamId,
            declIsSpreadMember: isSpreadMember,
          }
        }
        return {
          id,
          nameId,
          name: names[nameId].value,
          ...callParam,
        }
      }),
      inline,
      closed: !!closed,
      pseudoSpreadPropsName: pseudoSpreadPropsNameId ? names[pseudoSpreadPropsNameId].value : null,
      hasPropsSpread,
    }
  })

export default makeSelectInvocation
