import { STATELESS_FUNCTION_COMPONENT, DEFAULT } from 'constantz'

import Model, { attr, array, fk } from '../Model'

class Declaration extends Model {}

Declaration.modelName = 'Declaration'
Declaration.stateKey = 'declarations'

Declaration.fields = {
  nameId: fk('Name'),
  fileId: fk('File'),
  type: attr(STATELESS_FUNCTION_COMPONENT),
  declParamIds: array([], 'DeclParam', 'declarationId'),
  exportType: attr(DEFAULT),
  declarationIds: array([]),
  invocationIds: array([]),
  tag: attr(null),
  text: attr(),
}

export default Declaration
