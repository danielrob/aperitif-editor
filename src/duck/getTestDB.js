import { addNames, addFiles, addExpressions, addInvocations } from 'model-utils'
import { DIR, LOOKTHROUGH } from 'constantz'

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
    appWrapperNameId,
  ] = addNames({}, 'index', 'App', 'index', 'React', '', 'AppWrapper')

  // params
  const params = {
    1: { id: 1, name: 'userId', payload: 1 },
    2: { id: 2, name: 'title', payload: 'title' },
    3: { id: 3, name: 'body', payload: 'lorem ipsumm....' },
  }

  // invocations
  const importInvocation = { nameOrNameId: reactNameId, source: 'react' }
  const appWrapperInvocation = { nameOrNameId: appWrapperNameId, source: null, paramIds: [] }
  const [initialInvocations, reactInvocationId, appWrapperInvocationId] =
    addInvocations({}, importInvocation, appWrapperInvocation)

  // expressions
  const reactImport = {
    nameId: namelessId, type: LOOKTHROUGH, exportType: false, invocationIds: [reactInvocationId],
  }
  const appComponent = {
    nameId: appDirId, invocationIds: [appWrapperInvocationId], paramIds: Object.keys(params),
  }
  const appWrapper = { nameId: appWrapperNameId }
  const [initialExpressions, reactImportId, appComponentId, appWrapperId] =
    addExpressions({}, reactImport, appComponent, appWrapper)

  // files
  const indexFile = { nameId: indexNameId }
  const appFile = { nameId: appIndexId, expressionIds: [reactImportId, appComponentId] }
  const appWrapperFile = { nameId: appWrapperNameId, expressionIds: [appWrapperId] }
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
    params,
  }
}
