import Model, { attr, array, fk } from '../Model'

class CallParam extends Model {}

CallParam.modelName = 'CallParam'
CallParam.stateKey = 'params'

CallParam.fields = {
  declParamId: fk('DeclParam'),
  nameId: fk('Name'),
  valueNameIds: array([]),
  isCallSpreadMember: attr(true),
}

export default CallParam
