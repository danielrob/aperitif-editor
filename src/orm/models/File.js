import { JS } from 'constantz'
import Model, { attr, array, fk } from '../Model'

class File extends Model {

}

File.modelName = 'File'
File.stateKey = 'files'

File.fields = {
  nameId: fk('Name'),
  type: attr(JS),
  children: array([]),
  declarationIds: array([]),
}

export default File