import Model, { attr, fk } from '../Model'

class DeclParam extends Model {}

DeclParam.modelName = 'DeclParam'
DeclParam.stateKey = 'params'

DeclParam.fields = {
  nameId: fk('Name'),
  assignNameId: fk('Name'),
  payload: attr(null),
  // type specific items
  isSpreadMember: attr(false), // react component declarations
  count: attr(null),
}

export default DeclParam
