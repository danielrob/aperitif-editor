import { isNumber, uniqBy, sortBy } from 'lodash'
import { createSelector } from 'reselect'

import { PARAM_INVOCATION } from 'constantz'
import { composed } from 'utils'
import { selectInvocations, getCurrentFileExpressions, selectNames } from './baseSelectors'


const isAnImportInvocation = (nameOrNameId, type, expressionNameId) =>
  isNumber(nameOrNameId) &&
  expressionNameId !== nameOrNameId &&
  ![PARAM_INVOCATION].includes(type)


const getCurrentFileImports = createSelector( // which also represent all imports
  selectInvocations,
  getCurrentFileExpressions,
  selectNames,
  composed(
    (invocations, expressions, names) => expressions.reduce((out, expression) => {
      const reduceRecursively = (priorInvocations, id) => {
        const { nameOrNameId, type, source, invocationIds } = invocations[id]
        const thisInvocation = isAnImportInvocation(nameOrNameId, type, expression.nameId) ? [{
          id,
          importName: names[nameOrNameId],
          source: source || `../${names[nameOrNameId]}`, // TODO: derive paths
          order: nameOrNameId,
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
