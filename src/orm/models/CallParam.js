import Model, { attr, fk } from '../Model'

class CallParam extends Model {}

CallParam.modelName = 'CallParam'
CallParam.stateKey = 'callParams'

CallParam.fields = {
  nameId: fk('Name'),
  valueInvocationId: fk('Invocation'),
  declParamId: fk('DeclParam'),
  isCallSpreadMember: attr(true),
}

export default CallParam
