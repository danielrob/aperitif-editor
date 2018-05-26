import Models from './models'

class ORM {
  registeredModels = {}
  state = {}

  session = state => {
    this.state = state
    return this
  }

  register = (...Models) => {
    Models.forEach(Model => {
      this[Model.modelName] = new Model(this, Model)
    })
    return this
  }
}

const orm = new ORM()
orm.register(...Models)

export default orm
