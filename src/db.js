import invariant from 'invariant'

import { getNextId } from 'helpers'
import { getEntityAdder } from './helpers'
import { fileTypes, templateTypes, required } from './constants'

const { JS } = fileTypes
const { STATELESS_FUNCTION_COMPONENT } = templateTypes

/*
  model creation functions:
   (entities, partialEntity) => [{ ...entities, newId: filledEntity }, newId]
*/
export const addName = (names, name) => {
  invariant(name, 'name is required')
  const nextNameId = getNextId(names)
  return [{ ...names, [nextNameId]: name }, nextNameId]
}

export const addFile = getEntityAdder({
  nameId: required,
  type: JS,
  children: [],
  expressionIds: [],
})

export const addExpression = getEntityAdder({
  nameId: required,
  type: STATELESS_FUNCTION_COMPONENT,
  paramIds: [],
  importIds: [],
  exportIds: [],
  invocationIds: [],
})

