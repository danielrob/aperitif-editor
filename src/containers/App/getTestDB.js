import { addNames, addFiles, addExpressions, addInvocations } from 'db'
import { fileTypes, expressionTypes, exportTypes } from 'constantz'

const { DIR } = fileTypes
const { LOOKTHROUGH } = expressionTypes
const { DEFAULT_INLINE } = exportTypes

export default function getTestDB() {
  // initial state setup for testing

  // names
  const [
    initialNames,
    indexNameId,
    appDirId,
    appIndexId,
    reactNameId,
    irrelevantNameId,
  ] = addNames({}, 'index', 'App', 'index', 'React', '')

  // invocations
  const invocation = { importNameId: reactNameId, source: 'react' }
  const [initialInvocations, reactId] = addInvocations({}, invocation)

  // expressions
  const reactImport = { nameId: irrelevantNameId, type: LOOKTHROUGH, exportType: false, invocationIds: [reactId] }
  const appComponent = { nameId: appDirId }
  const [initialExpressions, reactImportId, appComponentId] = addExpressions({}, reactImport, appComponent)

  // files
  const indexFile = { nameId: indexNameId }
  const appFile = { nameId: appIndexId, expressionIds: [reactImportId, appComponentId] }
  const [initialFiles, appFileId] = addFiles({}, appFile, indexFile)

  const appDir = { nameId: appDirId, type: DIR, children: [appFileId] }
  const [initialFilesAndDirs] = addFiles(initialFiles, appDir)

  return {
    names: initialNames,
    files: initialFilesAndDirs,
    expressions: initialExpressions,
    invocations: initialInvocations,
    currentFileId: appFileId,
    params: {},
  }
}
