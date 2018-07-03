import Model, { attr, fk } from '../Model'

class DeclParam extends Model {
  incrementUsage = () => this.migrate({ invokeCount: invokeCount => invokeCount + 1 })
  decrementUsage = () => this.migrate({ invokeCount: invokeCount => invokeCount - 1 })
}

DeclParam.modelName = 'DeclParam'
DeclParam.stateKey = 'declParams'

DeclParam.fields = {
  nameId: fk('Name'),
  payload: attr(null),
  // type specific items
  isSpreadMember: attr(false), // react component declarations
  invokeCount: attr(0), // how many invocations of this param
}

export default DeclParam
