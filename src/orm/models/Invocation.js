import { COMPONENT_INVOCATION } from 'constantz'

import Model, { attr, array, fk } from '../Model'

class Invocation extends Model {}

Invocation.modelName = 'Invocation'
Invocation.stateKey = 'invocations'

Invocation.fields = {
  nameId: fk('Name'),
  declarationId: fk('Declaration'),
  source: attr(null),
  callParamIds: array(),
  invocationIds: array(),
  // type specific items
  type: attr(COMPONENT_INVOCATION),
  closed: attr(false),
  hasPropsSpread: attr(false),
  pseudoSpreadPropsNameId: fk('Name'),
  inline: attr(false),
}

export default Invocation