/* eslint-disable prefer-const */
import C from 'check-types'

import {
  DIR,
  STYLED_COMPONENT,
  PARAM_INVOCATION,
  ARRAY_MAP_METHOD,
  VAR_INVOCATION,
  CLASS_COMPONENT,
  CLASS_METHOD,
  CLASS_PROP,
  PROJECT_INDEX,
  CONST,
  exportTypes,
} from 'constantz'

import orm from 'orm'

import apiResponse from './apiArrayResponse.json'
// import apiResponse from './apiObjectResponse.json'

export const REACT_CHILDREN_DECLARATION_PARAM_ID = 2
export const REACT_CHILDREN_CALL_PARAM_ID = 1
export const REACT_CHILDREN_INVOCATION_ID = 1
export const KEY_NAME_ID = 2
export const ID_NAME_ID = 3

export default function getInitialState() {
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
    appWrapperName,
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
    'AppWrapper',
  ].map(name => Name.create(name))

  // {children} param invocation.
  Invocation.create({
    nameId: childrenNameId,
    type: PARAM_INVOCATION,
    callParamIds: [
      CallParam.create({
        declParamId: DeclParam.create({
          nameId: childrenNameId,
        }),
      }),
    ],
  })


  let declParamIds
  let appInvocation

  if (C.object(apiResponse)) {
    [...declParamIds] = Object.keys(apiResponse).map(key =>
      DeclParam.create({
        nameId: Name.create(key),
        payload: apiResponse[key],
      })
    )
  }

  if (C.array(apiResponse)) {
    const mergedObjectsInPayloadArray = Object.assign({}, ...apiResponse);

    [...declParamIds] = Object.keys(mergedObjectsInPayloadArray).map(key =>
      DeclParam.create({
        nameId: Name.create(key),
        payload: mergedObjectsInPayloadArray[key],
      })
    )
  }

  // declarations
  const appWrapperDeclId = Declaration.create({
    nameId: appWrapperName,
    type: STYLED_COMPONENT,
    tag: 'div',
  })

  const appDeclId = Declaration.create({
    nameId: appDirName,
    invocationIds: [
      Invocation.create({
        nameId: appWrapperName,
        callParamIds: [],
        closed: true,
        declarationId: appWrapperDeclId,
      }),
    ],
    declParamIds,
  })

  // dirs
  const components =
    File.create({
      nameId: Name.create('components'),
      type: DIR,
      children: [
        File.create({ // App
          nameId: appDirName,
          type: DIR,
          children: [
            File.create({ // index.js
              nameId: appIndexIdName,
              declarationIds: [
                appDeclId,
              ],
            }),
            File.create({ // AppWrapper.js
              nameId: appWrapperName,
              declarationIds: [
                appWrapperDeclId,
              ],
            }),
          ],
        }),
      ],
    })

  const renderDataConstDeclaration = Declaration.create({
    type: CONST,
    nameId: data,
    text: 'this.state.data',
  })


  if (C.object(apiResponse)) {
    appInvocation = Invocation.create({
      nameId: appDirName,
      closed: true,
      declarationId: appDeclId,
      pseudoSpreadPropsNameId: data,
    })
  } else {
    const mapPseudoParamNameId = Name.create('item')

    appInvocation = Invocation.create({
      nameId: data,
      type: VAR_INVOCATION,
      declarationId: renderDataConstDeclaration,
      invocationIds: [
        Invocation.create({
          nameId: mapPseudoParamNameId,
          type: ARRAY_MAP_METHOD,
          invocationIds: [
            Invocation.create({
              nameId: appDirName,
              declarationId: appDeclId,
              callParamIds: [
                CallParam.create({
                  nameId: KEY_NAME_ID,
                  valueNameIds: [mapPseudoParamNameId, ID_NAME_ID],
                }),
              ],
              pseudoSpreadPropsNameId: mapPseudoParamNameId,
              closed: true,
            }),
          ],
        }),
      ],
    })
  }


  const containers = File.create({
    nameId: Name.create('containers'),
    type: DIR,
    children: [
      File.create({
        nameId: appContainerName,
        type: DIR,
        children: [
          File.create({
            nameId: appContainerIndexName,
            declarationIds: [
              Declaration.create({
                type: CLASS_COMPONENT,
                nameId: appContainerName,
                declarationIds: [
                  Declaration.create({
                    nameId: Name.create('state'),
                    type: CLASS_PROP,
                    declParamIds: [
                      DeclParam.create({
                        nameId: data,
                        assignNameId: Name.create('sampleApiResponse'),
                      }),
                    ],
                  }),
                  Declaration.create({
                    nameId: Name.create('render'),
                    type: CLASS_METHOD,
                    declarationIds: [renderDataConstDeclaration],
                    invocationIds: [appInvocation],
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  })

  // files
  const indexFile = File.create({
    nameId: indexName,
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
      rootFiles: [components, containers, indexFile],
      currentFileId: 1,
      selectedFileId: 1,
    },
    preferences: {
      semis: true,
    },
  }
}
