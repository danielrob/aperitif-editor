import C from 'check-types'
import Model, { attr, array } from '../Model'

// Name is just a flat dictionary, so we override a few methods here.
class Name extends Model {
  constructor(...args) {
    super(...args)
    const { create } = this

    // couldn't get super.create to work, so override this way
    this.create = (name, mutable = true) => {
      if (C.string(name)) {
        return create({ value: name, mutable })
      }
      return create(name)
    }
  }
  value = () => this.ref().value
}

Name.modelName = 'Name'
Name.stateKey = 'names'

Name.fields = {
  value: attr(),
  mutable: attr(true),
  composite: array(),
}

export default Name
