import invariant from 'invariant'

import { getNextId, getEntitiesAdder } from 'helpers'

import { fileTypes, expressionTypes, exportTypes, required, requiredOrNull } from './constantz'

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

export const addParams = addNames

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
  nameOrNameId: required,
  source: requiredOrNull,
  paramIds: [],
  invocationIds: [],
})

