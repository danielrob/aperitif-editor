import { STATELESS_FUNCTION_COMPONENT, DEFAULT } from 'constantz'

import Model, { attr, array, fk } from '../Model'

class Declaration extends Model {}

Declaration.modelName = 'Declaration'
Declaration.stateKey = 'declarations'

Declaration.fields = {
  nameId: fk('Name'),
  type: attr(STATELESS_FUNCTION_COMPONENT),
  declParamIds: array([]), // could be a true 1-many
  exportType: attr(DEFAULT),
  invocationIds: array([]),
  tag: attr(null),
  text: attr(),
}

export default Declaration
