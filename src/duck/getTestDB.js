import { addNames, addParams, addFiles, addExpressions, addInvocations } from 'model-utils'
import { DIR, LOOKTHROUGH, STYLED_COMPONENT } from 'constantz'

export default function getTestDB() {
  // initial state setup for testing

  /* eslint-disable prefer-const */
  // names
  const [
    initialNames,
    indexName,
    appDirName,
    appIndexIdName,
    reactName,
    styledName,
    noName,
    appWrapperName,
  ] = addNames({}, 'index', 'App', 'index', 'React', 'styled', '', 'AppWrapper')

  // params
  let params = [
    { name: 'userId', payload: 1 },
    { name: 'title', payload: 'title' },
    { name: 'body', payload: 'lorem ipsumm....' },
  ];

  [params] = addParams({}, ...params)

  // invocations
  let importReact = { nameOrNameId: reactName, source: 'react' }
  let importStyled = { nameOrNameId: styledName, source: 'styled-components' }
  let appWrapperInvocation = { nameOrNameId: appWrapperName, source: null, paramIds: [], closed: true }
  let initialInvocations
  [initialInvocations, importReact, appWrapperInvocation, importStyled] =
    addInvocations({}, importReact, appWrapperInvocation, importStyled)

  // expressions
  let reactImport = {
    nameId: noName, type: LOOKTHROUGH, exportType: false, invocationIds: [importReact],
  }
  let styledImport = {
    nameId: noName, type: LOOKTHROUGH, exportType: false, invocationIds: [importStyled],
  }
  let appComponent = {
    nameId: appDirName, invocationIds: [appWrapperInvocation], paramIds: [1, 2, 3],
  }
  let appWrapper = { nameId: appWrapperName, type: STYLED_COMPONENT, tag: 'div' }
  let initialExpressions
  [initialExpressions, reactImport, appComponent, appWrapper, styledImport] =
    addExpressions({}, reactImport, appComponent, appWrapper, styledImport)

  // files
  const indexFile = { nameId: indexName }
  const appFile = { nameId: appIndexIdName, expressionIds: [reactImport, appComponent] }
  const appWrapperFile = { nameId: appWrapperName, expressionIds: [appWrapper, styledImport] }
  const [initialFiles, appFileId, indexFileId, appWrapperFileId] =
    addFiles({}, appFile, indexFile, appWrapperFile)

  const appDir = { nameId: appDirName, type: DIR, children: [appFileId, appWrapperFileId] }
  const [initialFilesAndDirs, appDirFileId] = addFiles(initialFiles, appDir)
  /* eslint-enable prefer-const */

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
