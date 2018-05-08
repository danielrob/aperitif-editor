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
    propTypesName,
    styledName,
    noName,
    appWrapperName,
  ] = addNames({}, 'index', 'App', 'index', 'React', 'PropTypes', 'styled', '', 'AppWrapper')

  // params
  let paramIds
  let params = [
    { name: 'bool', payload: true },
    { name: 'string', payload: 'strrrrrriiing' },
    { name: 'null', payload: null },
    { name: 'arrays', payload: [] },
    { name: 'object', payload: {} },
  ];

  [params, ...paramIds] = addParams({}, ...params)

  // invocations
  let propTypes = { nameOrNameId: propTypesName, source: 'prop-types' }
  let importReact = { nameOrNameId: reactName, source: 'react' }
  let importStyled = { nameOrNameId: styledName, source: 'styled-components' }
  let appWrapperInvocation = {
    nameOrNameId: appWrapperName, source: null, paramIds: [], closed: true
  }
  let initialInvocations
  [initialInvocations, importReact, propTypes, appWrapperInvocation, importStyled] =
    addInvocations({}, importReact, propTypes, appWrapperInvocation, importStyled)

  // expressions
  let reactImport = {
    nameId: noName, type: LOOKTHROUGH, exportType: false, invocationIds: [importReact],
  }
  let styledImport = {
    nameId: noName, type: LOOKTHROUGH, exportType: false, invocationIds: [importStyled],
  }
  let appComponent = {
    nameId: appDirName, invocationIds: [appWrapperInvocation], paramIds,
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
