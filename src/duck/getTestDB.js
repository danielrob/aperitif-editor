/* eslint-disable prefer-const */
import {
  DIR,
  STYLED_COMPONENT,
  PARAM_INVOCATION,
  CLASS_COMPONENT,
  PROJECT_INDEX,
  exportTypes,
} from 'constantz'

import orm from 'orm'

export const REACT_CHILDREN_DECLARATION_PARAM_ID = 2
export const REACT_CHILDREN_CALL_PARAM_ID = 1
export const REACT_CHILDREN_INVOCATION_ID = 1
export const KEY_NAME_ID = 2
export const ID_NAME_ID = 3

export default function getTestDB() {
  const session = orm.session({})

  const {
    Name,
    DeclParam,
    CallParam,
    Declaration,
    Invocation,
    File,
  } = session

  // Names
  const [
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
    p1,
    p2,
    p3,
    p4,
    p5,
    p6,
  ] =
  [
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
  ].map(name => Name.create(name))

  // CallParams
  const REACT_CHILDREN_CALL_PARAM_ID = CallParam.create({ declParamId: 2 });

  // DeclParams
  const [childrenDeclParam, ...declParamIds] = [
    { nameId: childrenNameId },
    { nameId: p1, payload: true },
    { nameId: p2, payload: 'strrrrrriiing' },
    { nameId: p3, payload: null },
    { nameId: p4, payload: [{ id: 2, name: 'woot', height: '1.82m' }] },
    { nameId: p5, payload: { yes: 'yes', we: 'we', spread: 'spread', array: [] } },
    { nameId: p6, payload: 6 },
  ].map(param => DeclParam.create(param))

  // Invocations
  const [reactChildren, propTypes, appWrapperInvocation, appInvocation] = [
    {
      nameId: childrenNameId,
      type: PARAM_INVOCATION,
      callParamIds: [REACT_CHILDREN_CALL_PARAM_ID],
    },
    {
      nameId: propTypesName,
      source: 'prop-types',
    },
    {
      nameId: appWrapperName,
      callParamIds: [],
      closed: true,
      declarationId: 2,
    },
    {
      nameId: appDirName,
      callParamIds: [],
      closed: true,
      declarationId: 3,
      pseudoSpreadPropsNameId: data,
    },
  ].map(inv => Invocation.create(inv))

  // declarations
  const [
    appComponent,
    appWrapper,
    appContainerComponent,
    projectIndex,
  ] = [
    {
      nameId: appDirName,
      invocationIds: [appWrapperInvocation],
      declParamIds,
    },
    {
      nameId: appWrapperName,
      type: STYLED_COMPONENT,
      tag: 'div',
    },
    {
      type: CLASS_COMPONENT,
      nameId: appContainerName,
      invocationIds: [appInvocation],
    },
    {
      type: PROJECT_INDEX,
      nameId: null,
      exportType: exportTypes.false,
    },
  ].map(decl => Declaration.create(decl))

  // files
  const [
    appFile,
    indexFile,
    appWrapperFile,
    appContainerIndexFile,
  ] = [
    { nameId: appIndexIdName, declarationIds: [appComponent] },
    { nameId: indexName, declarationIds: [projectIndex] },
    { nameId: appWrapperName, declarationIds: [appWrapper] },
    { nameId: appContainerIndexName, declarationIds: [appContainerComponent] },
  ].map(file => File.create(file))

  // dirs
  const [
    appDir,
    appContainerDir,
  ] = [
    { nameId: appDirName, type: DIR, children: [appFile, appWrapperFile] },
    { nameId: appContainerName, type: DIR, children: [appContainerIndexFile] },
  ].map(dir => File.create(dir))

  return {
    ...session.state,
    rootFiles: [appDir, appContainerDir, indexFile],
    currentFileId: appFile,
  }
}
