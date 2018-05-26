import invariant from 'invariant'
import { required, requiredOrNull } from 'constantz'

export const getNextId = integerKeyedObject => Math.max(0, ...Object.keys(integerKeyedObject)) + 1

export const getEntitiesAdder = (defaults = {}) => (entities, ...args) => {
  if (process.env.NODE_ENV !== 'production') {
    args.forEach(props => {
      Object.keys(defaults).forEach(key => {
        if (
          defaults[key] === required ||
          (defaults[key] === requiredOrNull && props[key] !== null)
        ) {
          invariant(props[key], `${key} is a required field`)
        }
      })
      Object.keys(props).forEach(key => {
        invariant(defaults[key] !== undefined, `${key} is an unknown property, ${JSON.stringify(defaults[key])}`)
      })
    })
  }

  return args.reduce((out, props) => {
    const [nextEntities, ...nextIds] = out
    const nextId = getNextId(nextEntities)
    return [
      { ...nextEntities, [nextId]: Object.assign({ id: nextId }, defaults, props) },
      ...nextIds, nextId,
    ]
  }, [entities])
}
