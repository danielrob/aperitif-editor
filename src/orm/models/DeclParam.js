import Model, { attr, fk } from '../Model'

class DeclParam extends Model {
  incrementUsage = () => this.migrate({ useCount: useCount => useCount + 1 })
  decrementUsage = () => this.migrate({ useCount: useCount => useCount - 1 })
}

DeclParam.modelName = 'DeclParam'
DeclParam.stateKey = 'declParams'

DeclParam.fields = {
  nameId: fk('Name'),
  payload: attr(null),
  // type specific items
  isSpreadMember: attr(false), // react component declarations
  useCount: attr(0),
}

export default DeclParam
