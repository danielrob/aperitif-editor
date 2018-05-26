import Model, { getNextId } from '../Model'

class Name extends Model {
  create = (name) => {
    const getModelData = this.getModelData()
    const id = getNextId(getModelData)

    this.setModelData({
      ...getModelData,
      [id]: name,
    })
    return id
  }
}

Name.modelName = 'Name'
Name.stateKey = 'names'

export default Name
