import { isFunction } from 'lodash'

/*
  Generic limited set immutable helpers
*/
/**
 * @function update: { ..., [id]: newValue|cb(oldValue), }
 * @param {Object} entities: object to update, e.g. a model table
 * @param {integer} entityId: object key, e.g. id of entity to be updated
 * @param {*} valueOrUpdater: value to set, or function to be called with prior value
 */
export const update = (entities, entityId, valueOrUpdater) => ({
  ...entities,
  [entityId]:
    (isFunction(valueOrUpdater) && valueOrUpdater(entities[entityId])) ||
    valueOrUpdater,
})

/**
 * @function updateAtKey: { ..., [id]: { ...oldEntity, key: newValue }, }
 * @param {Object} entities: object to update, e.g. a model table
 * @param {integer} entityId: object key, e.g. id of entity to be updated
 * @param {string|number} key: corresponding key in entity for which value shall be set
 * @param {*} newValue: value to set
 */
export const updateAtKey = (entities, entityId, key, newValue) => ({
  ...entities,
  [entityId]: {
    ...entities[entityId],
    [key]: newValue,
    id: entityId,
  },
})

/**
 * @function deleteKey: delete { ...oldEntity }[key]
 * @param {Object} objectToUpdate: object to be updated
 * @param {string|number} key: key to delete
 */
export const deleteKey = (objectToUpdate, key) => {
  const next = { ...objectToUpdate }
  delete next[key]
  return next
}

/**
 * @function insertAt: [..., newValue, ...]
 * @param {Array} arrayToUpdate: array to be updated
 * @param {*} insertValue: value to be inserted
 * @param {number} position: array position to update
 */
export const insertAt = (arrayToUpdate, insertValue, position = arrayToUpdate.length) => ([
  ...arrayToUpdate.slice(0, position),
  insertValue,
  ...arrayToUpdate.slice(position),
])

/**
 * @function insertAtKey: { ..., [key]: [..., newValue, ...] }
 * @param {Object} objectToUpdate: object to be updated
 * @param {*} key: object key at which to apply insertAt
 * @param {*} insertValue: value to be inserted
 * @param {number} position: array position to update
 */
export const insertAtKey = (objectToUpdate, key, insertValue, position) => ({
  ...objectToUpdate,
  [key]: insertAt(objectToUpdate[key], insertValue, position),
})

/**
 * @function remove: [...n, ,n+1...]
 * @param {Array} arrayToUpdate: array to be updated
 * @param {number} position: array position to remove
 */
export const remove = (arrayToUpdate, position) => ([
  ...arrayToUpdate.slice(0, position),
  ...arrayToUpdate.slice(position + 1),
])

/**
 * @function removeAtKey: { ..., [key]: [...n, ...n+1] }
 * @param {Object} objectToUpdate: object to be updated
 * @param {*} key: object key at which to apply removeAt
 * @param {number} position: array position to remove
 */
export const removeAtKey = (objectToUpdate, key, position) => ({
  ...objectToUpdate,
  [key]: remove(objectToUpdate[key], position),
})

/**
 * @function filterOut: oldValue.filter(v => v !== valueToRemove)
 * @param {Array} arrayToUpdate: array to be updated
 * @param {number} valueToRemove: value to filter from array
 */
export const filterOut = (arrayToUpdate, valueToRemove) =>
  arrayToUpdate.filter(value => value !== valueToRemove)

/**
 * @function filterOutAtKey: { ..., [key]: oldValue.filter(v => v !== valueToRemove) }
 * @param {Object} objectToUpdate: object to be updated
 * @param {*} key: object key at which to apply removeAt
 * @param {number} position: array position to remove
 */
export const filterOutAtKey = (objectToUpdate, key, valueToRemove) => ({
  ...objectToUpdate,
  [key]: filterOut(objectToUpdate[key], valueToRemove),
})

