import { isNumber, uniqBy, sortBy } from 'lodash'
import { createSelector } from 'reselect'

import { PARAM_INVOCATION } from 'constantz'
import { composed } from 'utils'
import { selectInvocations, getCurrentFileExpressions, selectNames } from './baseSelectors'


const isAnImportInvocation = (nameId, type, expressionNameId) =>
  isNumber(nameId) &&
  expressionNameId !== nameId &&
  ![PARAM_INVOCATION].includes(type)


const getCurrentFileImports = createSelector( // which also represent all imports
  selectInvocations,
  getCurrentFileExpressions,
  selectNames,
  composed(
    (invocations, expressions, names) => expressions.reduce((out, expression) => {
      const reduceRecursively = (priorInvocations, id) => {
        const { nameId, type, source, invocationIds } = invocations[id]
        const thisInvocation = isAnImportInvocation(nameId, type, expression.nameId) ? [{
          id,
          importName: names[nameId],
          source: source || `../${names[nameId]}`, // TODO: derive paths
          order: nameId,
        }] : []
        return [
          ...priorInvocations,
          ...thisInvocation,
          ...invocationIds.reduce(reduceRecursively, []),
        ]
      }
      return ([...out, ...expression.invocationIds.reduce(reduceRecursively, [])])
    }, []),
    imports => uniqBy(imports, 'importName'),
    imports => sortBy(imports, 'order'),
  )
)

export default getCurrentFileImports
