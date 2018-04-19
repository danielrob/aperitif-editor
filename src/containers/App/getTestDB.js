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
    namelessId,
    appWrapperId,
  ] = addNames({}, 'index', 'App', 'index', 'React', '', 'AppWrapper')

  // invocations
  const importInvocation = { importNameId: reactNameId, source: 'react' }
  const [initialInvocations, reactInvocationId] = addInvocations({}, importInvocation)

  // expressions
  const reactImport = {
    nameId: namelessId, type: LOOKTHROUGH, exportType: false, invocationIds: [reactInvocationId],
  }
  const appComponent = { nameId: appDirId }
  const appWrapper = { nameId: appWrapperId }
  const [initialExpressions, reactImportId, appComponentId] =
    addExpressions({}, reactImport, appComponent)

  // files
  const indexFile = { nameId: indexNameId }
  const appFile = { nameId: appIndexId, expressionIds: [reactImportId, appComponentId] }
  const appWrapperFile = { nameId: appWrapperId, expressionIds: [appWrapper] }
  const [initialFiles, appFileId, indexFileId, appWrapperFileId] =
    addFiles({}, appFile, indexFile, appWrapperFile)

  const appDir = { nameId: appDirId, type: DIR, children: [appFileId, appWrapperFileId] }
  const [initialFilesAndDirs, appDirFileId] = addFiles(initialFiles, appDir)

  return {
    names: initialNames,
    files: initialFilesAndDirs,
    rootFiles: [appDirFileId, indexFileId],
    expressions: initialExpressions,
    invocations: initialInvocations,
    currentFileId: appFileId,
    params: {},
  }
}
