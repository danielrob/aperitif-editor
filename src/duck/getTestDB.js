/* eslint-disable prefer-const */
import { addNames, addDeclParams, addFiles, addExpressions, addInvocations } from 'model-utils'
import { DIR, LOOKTHROUGH, STYLED_COMPONENT, PARAM_INVOCATION } from 'constantz'

export const REACT_CHILDREN_DECLARATION_PARAM_ID = 2
export const REACT_CHILDREN_CALL_PARAM_ID = 1
export const REACT_CHILDREN_INVOCATION_ID = 1
export const KEY_NAME_ID = 2
export const ID_NAME_ID = 3

export default function getTestDB() {
  // initial state setup for testing

  // names
  const [
    initialNames,
    childrenNameId,
    keyNameId, // eslint-disable-line no-unused-vars
    idNameId, // eslint-disable-line no-unused-vars
    indexName,
    appDirName,
    appIndexIdName,
    propTypesName,
    appWrapperName,
    p1, p2, p3, p4, p5, p6,
  ] = addNames(
    {},
    'children',
    'key',
    'id',
    'index',
    'App',
    'index',
    'PropTypes',
    'AppWrapper',
    'bool',
    'string',
    'null',
    'arrays',
    'object',
    'number',
  )

  // params
  let declParamIds
  let childrenParamId // eslint-disable-line no-unused-vars
  let params = [
    { nameId: childrenNameId },
    { nameId: p1, payload: true },
    { nameId: p2, payload: 'strrrrrriiing' },
    { nameId: p3, payload: null },
    { nameId: p4, payload: [{ id: 2, name: 'woot', height: '1.82m' }] },
    { nameId: p5, payload: { yes: 'yes', we: 'we', spread: 'spread', array: [] } },
    { nameId: p6, payload: 6 },
  ];

  [params, childrenParamId, ...declParamIds] = addDeclParams({
    1: { id: 1, declParamId: REACT_CHILDREN_DECLARATION_PARAM_ID }, // children id hack
  }, ...params)

  // invocations
  let reactChildren = {
    nameId: childrenNameId,
    type: PARAM_INVOCATION,
    callParamIds: [REACT_CHILDREN_CALL_PARAM_ID],
    source: null,
  }
  let propTypes = { nameId: propTypesName, source: 'prop-types' }
  let appWrapperInvocation = {
    nameId: appWrapperName, source: null, callParamIds: [], closed: true, expressionId: 2,
  }
  let initialInvocations
  [initialInvocations, reactChildren, propTypes, appWrapperInvocation] =
    addInvocations({}, reactChildren, propTypes, appWrapperInvocation)

  // expressions
  let appComponent = {
    nameId: appDirName, invocationIds: [appWrapperInvocation], declParamIds,
  }
  let appWrapper = { nameId: appWrapperName, type: STYLED_COMPONENT, tag: 'div' }
  let initialExpressions
  [initialExpressions, appComponent, appWrapper] =
    addExpressions({}, appComponent, appWrapper)

  // files
  const indexFile = { nameId: indexName }
  const appFile = { nameId: appIndexIdName, expressionIds: [appComponent] }
  const appWrapperFile = { nameId: appWrapperName, expressionIds: [appWrapper] }
  const [initialFiles, appFileId, indexFileId, appWrapperFileId] =
    addFiles({}, appFile, indexFile, appWrapperFile)

  const appDir = { nameId: appDirName, type: DIR, children: [appFileId, appWrapperFileId] }
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
