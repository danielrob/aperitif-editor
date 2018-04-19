import invariant from 'invariant'

import { getNextId, getEntitiesAdder } from 'helpers'

import { fileTypes, expressionTypes, exportTypes, required } from './constantz'

/* constant imports */
const { JS } = fileTypes
const { STATELESS_FUNCTION_COMPONENT } = expressionTypes
const { DEFAULT } = exportTypes

/*
  model creation functions:
   (entities, partialEntity) => [{ ...entities, newId: filledEntity }, newId]
*/
export const addNames = (names, ...args) => {
  invariant(args && args[0], 'at least one name is required')
  return args.reduce((out, name) => {
    const [nextNames, ...nextIds] = out
    const nextNameId = getNextId(nextNames)
    return [
      { ...nextNames, [nextNameId]: name },
      ...nextIds, nextNameId,
    ]
  }, [names])
}

export const addFiles = getEntitiesAdder({
  nameId: required,
  type: JS,
  children: [],
  expressionIds: [],
})

export const addExpressions = getEntitiesAdder({
  nameId: required,
  type: STATELESS_FUNCTION_COMPONENT,
  paramIds: [],
  exportType: DEFAULT,
  invocationIds: [],
})

export const addInvocations = getEntitiesAdder({
  importNameId: required,
  source: required, // expressionId or 'module-name'
  paramIds: [],
  invocationIds: [],
})

