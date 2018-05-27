import invariant from 'invariant'
import { required, requiredOrNull } from 'constantz'

class Model {
  constructor(orm, modelClass) {
    this.session = orm // session is the ORM itself. When consumed it will have session.state
    this.modelName = modelClass.modelName
    this.stateKey = modelClass.stateKey
    this.fields = modelClass.fields

    this.initializeFields(modelClass.fields, orm)
  }

  initializeFields = (fields = {}, orm) => {
    this.defaultProps = {}
    this.foreignKeys = {}

    Object.keys(fields).forEach(key => {
      const { type, defaultValue, modelName } = fields[key]
      switch (type) {
        case 'attr': {
          this.defaultProps[key] = defaultValue
          break
        }
        case 'fk': {
          invariant(orm[modelName], `Did not find model ${modelName} in registry.`)
          this.foreignKeys[key] = orm[modelName].stateKey
          this.defaultProps[key] = null
          const Model = orm.modelClasses[modelName]
          if (key.endsWith('Id')) {
            Object.defineProperty(this, key.replace('Id', ''), {
              get() {
                const { result: { id } } = this.currentQueryResult
                const currentValue = this.getModelData()[id][key]
                if (currentValue) {
                  return new Model(orm, Model).withId(currentValue)
                }
                return null
              },
            })
          }
          break
        }
        case 'array': {
          this.defaultProps[key] = defaultValue || []
          const modelKey = key.endsWith('Ids') ? key.replace('Ids', 's') : key
          this[modelKey] = {
            insert: (value, position) => this.inserter(key, value, position),
            remove: value => this.remover(key, value),
            // add back array methods
            filter: cb => this.bindArrayMethod(key, 'filter', cb),
            find: cb => this.bindArrayMethod(key, 'find', cb),
            findIndex: cb => this.bindArrayMethod(key, 'findIndex', cb),
            includes: cb => this.bindArrayMethod(key, 'includes', cb),
          }
          break
        }
        default: {
          invariant(true, 'field must have a type')
        }
      }
    })
  }

  inserter = (key, insertValue, position) => {
    const { result: { id } } = this.currentQueryResult
    const arrayToUpdate = this.getModelData()[id][key]
    const targetPosition = (position === 0 || position) ? position : arrayToUpdate.length

    this.update({
      [key]: [
        ...arrayToUpdate.slice(0, targetPosition),
        insertValue,
        ...arrayToUpdate.slice(targetPosition),
      ],
    })
  }

  bindArrayMethod = (key, method, ...args) => {
    const { result: { id } } = this.currentQueryResult
    return this.getModelData()[id][key][method](...args)
  }

  remover = (key, valueToRemove) => {
    const {
      result: { id },
    } = this.currentQueryResult
    const arrayToUpdate = this.getModelData()[id][key]

    this.update({
      [key]: arrayToUpdate.filter(value => value !== valueToRemove),
    })
  }

  /* internal */
  setCurrentQueryResult = (result, isSet) => {
    this.currentQueryResult = { result, isSet }
    return true
  }

  getModelData = () => this.session.state[this.stateKey] || {}

  setModelData = data => {
    this.session.state = {
      ...this.session.state,
      [this.stateKey]: data,
    }
  }

  /* interface */
  // chainable
  all = () => this.setCurrentQueryResult(this.getModelData(), true) && this

  withId = id => this.setCurrentQueryResult(this.getModelData()[id], false) && this

  // non-chainable
  ref = () => this.currentQueryResult.result

  create = newModel => {
    const getModelData = this.getModelData()
    const id = getNextId(getModelData)

    validate(this.fields, newModel)

    this.setModelData({
      ...getModelData,
      [id]: {
        ...this.defaultProps,
        ...newModel,
        id,
      },
    })
    return id
  }

  hasId = id => !!this.getModelData()[id]

  update = mergeProps => {
    const { result, isSet } = this.currentQueryResult
    const modelId = result.id
    const modelData = this.getModelData()

    invariant(!isSet, 'updating multiple entities at once is not supported')
    this.setModelData({
      ...modelData,
      [modelId]: {
        ...modelData[modelId],
        ...mergeProps,
      },
    })
  }

  migrate = mergeFunctions => {
    const { result, isSet } = this.currentQueryResult
    const currentData = this.getModelData()[result.id]
    invariant(!isSet, 'migrating multiple entities at once is not supported')

    return this.update(
      Object.keys(mergeFunctions).reduce(
        (out, key) => ({
          ...out,
          [key]: mergeFunctions[key](currentData[key], currentData),
        }),
        {}
      )
    )
  }

  delete = () => {
    const { result, isSet } = this.currentQueryResult
    const modelId = result.id
    const nextModelData = {
      ...this.getModelData(),
    }

    invariant(!isSet, 'deleting multiple entities at once is not supported')

    delete nextModelData[modelId]

    this.setModelData(nextModelData)
  }
}

export default Model

// field utils
export const attr = opts =>
  opts !== null && typeof opts === 'object' && !opts.length === 0
    ? {
      ...opts,
      type: 'attr',
    }
    : {
      defaultValue: opts,
      type: 'attr',
    }

export const fk = (modelName, methodName) => ({
  type: 'fk',
  modelName,
  methodName,
})

export const array = () => ({
  type: 'array',
})

// model utils
export const getNextId = integerKeyedObject => Math.max(0, ...Object.keys(integerKeyedObject)) + 1

const validate = (defaults, props) => {
  if (process.env.NODE_ENV !== 'production') {
    Object.keys(defaults).forEach(key => {
      if (defaults[key] === required || (defaults[key] === requiredOrNull && props[key] !== null)) {
        invariant(props[key], `${key} is a required field`)
      }
    })
    Object.keys(props).forEach(key => {
      invariant(
        defaults[key] !== undefined,
        `${key} is an unknown property, ${JSON.stringify(defaults[key])}`
      )
    })
  }
}
