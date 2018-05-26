import { COMPONENT_INVOCATION } from 'constantz'

import Model, { attr, array, fk } from '../Model'

class Invocation extends Model {}

Invocation.modelName = 'Invocation'
Invocation.stateKey = 'invocations'

Invocation.fields = {
  nameId: fk('Name'),
  source: attr(null),
  callParamIds: array(),
  invocationIds: array(),
  // type specific items
  type: attr(COMPONENT_INVOCATION),
  closed: attr(false),
  hasPropsSpread: attr(false),
  pseudoSpreadPropsNameId: fk('Name'),
  declarationId: attr(null),
  inline: attr(false),
}

export default Invocation
