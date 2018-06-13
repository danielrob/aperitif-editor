import Model, { attr, fk } from '../Model'

class DeclParam extends Model {}

DeclParam.modelName = 'DeclParam'
DeclParam.stateKey = 'declParams'

DeclParam.fields = {
  nameId: fk('Name'),
  assignNameId: fk('Name'),
  payload: attr(null),
  // type specific items
  isSpreadMember: attr(false), // react component declarations
  count: attr(1),
}

export default DeclParam
