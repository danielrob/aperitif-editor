import { uniqBy, sortBy } from 'lodash'
import { createSelector } from 'reselect'

import { PARAM_INVOCATION, STYLED_COMPONENT, STATELESS_FUNCTION_COMPONENT } from 'constantz'
import { composed } from 'utils'
import { selectInvocations, getCurrentFileExpressions, selectNames } from './baseSelectors'

const getCurrentFileImports = createSelector( // which also represent all imports
  selectInvocations,
  getCurrentFileExpressions,
  selectNames,
  composed(
    (invocations, expressions, names) => {
      // Much simpler to handle these specific import cases here than in an abstract manner
      const imports = []

      if (expressions.find(({ type }) => type === STYLED_COMPONENT)) {
        imports.push({ id: 'styled', importName: 'styled', source: 'styled-components', order: 1 })
      }

      if (expressions.find(({ type }) => [STATELESS_FUNCTION_COMPONENT].includes(type))) {
        imports.push({ id: 'react', importName: 'React', source: 'react', order: 0 })
      }

      return expressions.reduce((out, expression) => {
        const reduceRecursively = (priorInvocations, id) => {
          const { nameId, type, source, invocationIds, expressionId } = invocations[id]
          const thisInvocation = isAnImportInvocation(nameId, type, expressions) ? [{
            id,
            importName: names[nameId],
            source: source || `../${names[nameId]}`, // TODO: derive paths
            order: nameId,
            expressionId,
          }] : []
          return [
            ...priorInvocations,
            ...thisInvocation,
            ...invocationIds.reduce(reduceRecursively, []),
          ]
        }
        return ([...out, ...expression.invocationIds.reduce(reduceRecursively, [])])
      }, imports)
    },
    imports => uniqBy(imports, 'importName'),
    imports => sortBy(imports, 'order'),
  )
)


const isAnImportInvocation = (invocationNameId, type, expressions) =>
  !expressions.find(({ nameId }) => nameId === invocationNameId) &&
  ![PARAM_INVOCATION].includes(type)

export default getCurrentFileImports
