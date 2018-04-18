import invariant from 'invariant'
import { required } from 'constants'

export const getNextId = integerKeyedObject => Math.max(...Object.keys(integerKeyedObject)) + 1

export const getEntityAdder = (defaults = {}) => (entities, props) => {
  Object.keys(defaults).forEach(key => {
    if (defaults[key] === required) {
      invariant(props[key], `${key} is a required field`)
    }
  })

  const nextId = getNextId(entities)
  return [{
    ...entities,
    [nextId]: Object.assign({}, defaults, props, { id: nextId }),
  }, nextId]
}

export const updateEntity = (entities, entityId, valuesOrFunction) => ({
  ...entities,
  [entityId]: typeof valuesOrFunction === 'function'
    ? valuesOrFunction(entities[entityId])
    : Object.assign({}, entities[entityId], valuesOrFunction, { id: entities[entityId].id }),
})

export const insertAt = (arrayToUpdate, position, insertValue) => ([
  ...arrayToUpdate.slice(0, position),
  insertValue,
  ...arrayToUpdate.slice(position),
])

export const insertAtKey = (objectToUpdate, key, position, insertValue) => ({
  ...objectToUpdate,
  [key]: [
    ...objectToUpdate[key].slice(0, position),
    insertValue,
    ...objectToUpdate[key].slice(position),
  ],
})
