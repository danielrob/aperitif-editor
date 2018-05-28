import invariant from 'invariant'
import Model, { getNextId } from '../Model'

// Name is just a flat dictionary, so we override a few methods here.
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

  withId = id => this.setCurrentQueryResult(id, false) && this

  ref = () => this.getModelData()[this.currentQueryResult.result]

  update = newName => {
    const { result: nameId, isSet } = this.currentQueryResult
    const modelData = this.getModelData()
    invariant(!isSet, 'updating multiple entities at once is not supported')
    this.setModelData({ ...modelData, [nameId]: newName })
  }
}

Name.modelName = 'Name'
Name.stateKey = 'names'

export default Name
