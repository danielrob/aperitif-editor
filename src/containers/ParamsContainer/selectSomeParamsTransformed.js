import { createSelector } from 'reselect'

import { selectNames, selectSomeParams } from 'selectors'

const selectSomeParamsTransformed = createSelector(
  selectNames,
  selectSomeParams,
  (names, params) => params.map(param => ({
    name: names[param.nameId],
    ...param,
  }))
)

export default selectSomeParamsTransformed
