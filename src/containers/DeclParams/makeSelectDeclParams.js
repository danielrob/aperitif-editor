import { groupBy } from 'lodash'
import { createSelector } from 'reselect'

import { selectNames, selectDeclParams } from 'selectors'

const makeSelectDeclParams = () => createSelector(
  selectNames,
  selectDeclParams,
  (state, props) => props.ids,
  (names, declParams, declParamIds = []) =>
    Object.entries(groupBy(
      declParamIds.map(id => {
        const { nameId, ...rest } = declParams[id]
        return {
          nameId,
          name: names[nameId].value,
          ...rest,
        }
      }),
      'name'
    )).map(([, group]) => ({
      ...group[0],
      useCount: group.reduce((count, { useCount }) => count + useCount, 0),
      altIds: group.map(({ id }) => id),
    }))
)

export default makeSelectDeclParams
