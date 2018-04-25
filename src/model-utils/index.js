import invariant from 'invariant'

import { JS, STATELESS_FUNCTION_COMPONENT, DEFAULT, required, requiredOrNull } from 'constantz'
import { getNextId, getEntitiesAdder } from './helpers'


/*
  Model creation functions
*/
/**
  * The following functions have this signature:
  * @param {Object} modelTable: existing model table to update
  * @param {...Object} newPartial: combined with default model props to create a new model instance
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

export const addParams = getEntitiesAdder({
  name: required,
  payload: null,
})


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


/*
  Generic limited immutable helpers
*/
/**
 * @function updateEntity: { ..., [id]: newValue|cb(oldValue), }
 * @param {Object} entities: e.g. a model table
 * @param {integer} entityId: id of entity to be updated
 * @param {Object|Function} valueOrUpdater: value to set, or function to be called with prior value
 */
export const updateEntity = (entities, entityId, valueOrUpdater) => ({
  ...entities,
  [entityId]: typeof valueOrUpdater === 'function'
    ? valueOrUpdater(entities[entityId])
    : Object.assign({ id: entities[entityId].id }, entities[entityId], valueOrUpdater),
})

/**
 * @function insertAt: [..., newValue, ...]
 * @param {Array} arrayToUpdate: array to be updated
 * @param {number} position: array position to update
 * @param {*} insertValue: value to be inserted
 */
export const insertAt = (arrayToUpdate, position, insertValue) => ([
  ...arrayToUpdate.slice(0, position),
  insertValue,
  ...arrayToUpdate.slice(position),
])

/**
 * @function insertAtKey: { ..., [key]: [..., newValue, ...] }
 * @param {Object} objectToUpdate: object to be updated
 * @param {*} key: object key at which to apply insertAt
 * @param {number} position: array position to update
 * @param {*} insertValue: value to be inserted
 */
export const insertAtKey = (objectToUpdate, key, position, insertValue) => ({
  ...objectToUpdate,
  [key]: insertAt(objectToUpdate[key], position, insertValue),
})

