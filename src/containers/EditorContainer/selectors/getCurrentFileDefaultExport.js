import { createSelector } from 'reselect'
import { DEFAULT } from 'constantz'

import { getCurrentFileDeclarations } from './selectors'

export const getCurrentFileDefaultExport = createSelector(
  getCurrentFileDeclarations,
  (declarations) => {
    const exprWithDefExport = declarations.find(({ exportType }) => exportType === DEFAULT)
    return exprWithDefExport && exprWithDefExport.nameId
  }
)
