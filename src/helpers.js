import invariant from 'invariant'

import { required } from './constantz'

export const getNextId = integerKeyedObject => Math.max(0, ...Object.keys(integerKeyedObject)) + 1

export const getEntitiesAdder = (defaults = {}) => (entities, ...args) => {
  args.forEach(props => {
    if (process.env.NODE_ENV !== 'production') {
      Object.keys(defaults).forEach(key => {
        if (defaults[key] === required) {
          invariant(props[key], `${key} is a required field`)
        }
      })
      Object.keys(props).forEach(key => {
        invariant(defaults[key] !== undefined, `${key} is an unknown property, ${JSON.stringify(defaults[key])}`)
      })
    }
  })

  return args.reduce((out, props) => {
    const [nextEntities, ...nextIds] = out
    const nextId = getNextId(nextEntities)
    return [
      { ...nextEntities, [nextId]: Object.assign({ id: nextId }, defaults, props) },
      ...nextIds, nextId,
    ]
  }, [entities])
}

export const updateEntity = (entities, entityId, valuesOrFunction) => ({
  ...entities,
  [entityId]: typeof valuesOrFunction === 'function'
    ? valuesOrFunction(entities[entityId])
    : Object.assign({ id: entities[entityId].id }, entities[entityId], valuesOrFunction),
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
