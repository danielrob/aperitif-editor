import { createSelector } from 'reselect'
import { selectNames } from 'selectors'
import { DEFAULT } from 'constantz'

import { getCurrentFileDeclarations } from './selectors'

export const getCurrentFileDefaultExport = createSelector(
  getCurrentFileDeclarations,
  selectNames,
  (declarations, names) => {
    const exprWithDefExport = declarations.find(({ exportType }) => exportType === DEFAULT)
    return exprWithDefExport && names[exprWithDefExport.nameId]
  }
)
