/* eslint-disable prefer-const */
import { addNames, addDeclParams, addFiles, addDeclarations, addInvocations } from 'model-utils'
import { DIR, STYLED_COMPONENT, PARAM_INVOCATION, CLASS_COMPONENT } from 'constantz'

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
    data,
    appContainerName,
    appContainerIndexName,
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
    'data',
    'AppContainer',
    'index',
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
  }
  let propTypes = { nameId: propTypesName, source: 'prop-types' }
  let appWrapperInvocation = {
    nameId: appWrapperName, callParamIds: [], closed: true, declarationId: 2,
  }
  let appInvocation = {
    nameId: appDirName,
    callParamIds: [],
    closed: true,
    declarationId: 3,
    pseudoSpreadPropsNameId: data,
  }

  let initialInvocations

  [initialInvocations, reactChildren, propTypes, appWrapperInvocation, appInvocation] =
    addInvocations({}, reactChildren, propTypes, appWrapperInvocation, appInvocation)

  // declarations
  let appComponent = {
    nameId: appDirName, invocationIds: [appWrapperInvocation], declParamIds,
  }
  let appWrapper = { nameId: appWrapperName, type: STYLED_COMPONENT, tag: 'div' }

  let appContainerComponent = {
    type: CLASS_COMPONENT,
    nameId: appContainerName,
    invocationIds: [appInvocation],
  }

  let initialDeclarations
  [initialDeclarations, appComponent, appWrapper, appContainerComponent] =
    addDeclarations({}, appComponent, appWrapper, appContainerComponent)

  // files
  let indexFile = { nameId: indexName }
  let appFile = { nameId: appIndexIdName, declarationIds: [appComponent] }
  let appWrapperFile = { nameId: appWrapperName, declarationIds: [appWrapper] }

  let appContainerIndexFile = { nameId: appContainerIndexName, declarationIds: [appContainerComponent] }
  let initialFiles;

  [initialFiles, appFile, indexFile, appWrapperFile, appContainerIndexFile] =
    addFiles({}, appFile, indexFile, appWrapperFile, appContainerIndexFile)

  let appDir = { nameId: appDirName, type: DIR, children: [appFile, appWrapperFile] }
  let appContainerDir = { nameId: appContainerName, type: DIR, children: [appContainerIndexFile] };
  [initialFiles, appDir, appContainerDir] = addFiles(initialFiles, appDir, appContainerDir)

  return {
    names: initialNames,
    files: initialFiles,
    rootFiles: [appDir, appContainerDir, indexFile],
    declarations: initialDeclarations,
    invocations: initialInvocations,
    currentFileId: appContainerIndexFile,
    params,
  }
}
