import Models from './models'

class ORM {
  constructor() {
    Object.defineProperty(this, 'currentFile', {
      get() {
        return (this.state && this.state.files[this.state.editor.currentFileId]) || {}
      },
    })
  }

  registeredModels = {}
  state = {}

  session = state => {
    this.state = state
    return this
  }

  register = (...Models) => {
    this.modelClasses = this.modelClasses || {}
    Models.forEach(Model => {
      this[Model.modelName] = new Model(this, Model)
      this.modelClasses[Model.modelName] = Model
    })
    return this
  }
}

const orm = new ORM()
orm.register(...Models)

export default orm
