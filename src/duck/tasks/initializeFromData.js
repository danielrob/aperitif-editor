import C from 'check-types'
import { PROJECT_INDEX, INDEX_NAME_ID, exportTypes } from 'constantz'
import orm from 'orm'
import addNewContainer from './addNewContainer'

export default function initializeFromData(state, apiResponse) {
  const session = orm.session(state)

  const { Declaration, File } = session

  addNewContainer(session, apiResponse, 'Items')

  // files
  const indexFile = File.create({
    nameId: INDEX_NAME_ID,
    declarationIds: [
      Declaration.create({
        type: PROJECT_INDEX,
        nameId: null,
        exportType: exportTypes.false,
      }),
    ],
  })

  return {
    ...session.state,
    editor: {
      rootFiles: [...session.state.editor.rootFiles, indexFile],
      currentFileId: C.array.of.object(apiResponse) ? 10 : 7,
      selectedFileId: C.array.of.object(apiResponse) ? 10 : 7,
      projectInitialized: true,
    },
  }
}
