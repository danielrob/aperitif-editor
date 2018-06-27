import Model, { fk } from '../Model'

class CallParam extends Model {}

CallParam.modelName = 'CallParam'
CallParam.stateKey = 'callParams'

CallParam.fields = {
  nameId: fk('Name'),
  valueInvocationId: fk('Invocation'),
  declParamId: fk('DeclParam'),
}

export default CallParam
