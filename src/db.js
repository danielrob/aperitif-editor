import invariant from 'invariant'

import { getNextId, getEntitiesAdder } from 'helpers'

import { fileTypes, templateTypes, required } from './constantz'

/* constant imports */
const { JS } = fileTypes
const { STATELESS_FUNCTION_COMPONENT } = templateTypes

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
  importIds: [],
  exportIds: [],
  invocationIds: [],
})

export const addImports = getEntitiesAdder({
  default: null, // 'name' or null
  wildcard: false, // 'name' or null
  named: [], // names ids
  fromFile: false,
  fromModule: false,
})

export const addExports = getEntitiesAdder({
  defaultNameId: 2,
  inline: false,
  named: [], // names ids
  from: null,
})

