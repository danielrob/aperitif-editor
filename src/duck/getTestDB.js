import { addNames, addParams, addFiles, addExpressions, addInvocations } from 'model-utils'
import { DIR, LOOKTHROUGH, STYLED_COMPONENT, PARAM_INVOCATION } from 'constantz'

export default function getTestDB() {
  // initial state setup for testing

  /* eslint-disable prefer-const */
  // names
  const [
    initialNames,
    childrenNameId, // eslint-disable-line no-unused-vars
    indexName,
    appDirName,
    appIndexIdName,
    reactName,
    propTypesName,
    styledName,
    noName,
    appWrapperName,
    p1, p2, p3, p4, p5,
  ] = addNames(
    {},
    'children',
    'index',
    'App',
    'index',
    'React',
    'PropTypes',
    'styled',
    '',
    'AppWrapper',
    'bool',
    'string',
    'null',
    'arrays',
    'object'
  )

  // params
  let paramIds
  let childrenParamId
  let params = [
    { nameId: childrenNameId },
    { nameId: p1, payload: true },
    { nameId: p2, payload: 'strrrrrriiing' },
    { nameId: p3, payload: null },
    { nameId: p4, payload: [] },
    { nameId: p5, payload: {} },
  ];

  [params, childrenParamId, ...paramIds] = addParams({}, ...params)

  // invocations
  let reactChildren = {
    nameId: childrenNameId,
    type: PARAM_INVOCATION,
    callParamIds: [childrenParamId],
    source: null,
  }
  let propTypes = { nameId: propTypesName, source: 'prop-types' }
  let importReact = { nameId: reactName, source: 'react' }
  let importStyled = { nameId: styledName, source: 'styled-components' }
  let appWrapperInvocation = {
    nameId: appWrapperName, source: null, callParamIds: [], closed: true,
  }
  let initialInvocations
  [initialInvocations, reactChildren, importReact, propTypes, appWrapperInvocation, importStyled] =
    addInvocations({}, reactChildren, importReact, propTypes, appWrapperInvocation, importStyled)

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
