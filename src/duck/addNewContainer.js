/* eslint-disable prefer-const */
import C from 'check-types'

import {
  DIR,
  JSON_TYPE,
  IMPORT_VAR,
  STYLED_COMPONENT,
  ARRAY_MAP_METHOD,
  VAR_INVOCATION,
  CLASS_COMPONENT,
  CLASS_METHOD,
  CLASS_PROP,
  CONST,
  OBJECT_LITERAL_KEY,
} from 'constantz'


import orm from 'orm'

import { COMPONENTS_FILE_ID, CONTAINERS_FILE_ID, INDEX_NAME_ID, KEY_NAME_ID, ID_NAME_ID } from './getInitialState'

export const APP_CONTAINER_NAME_ID = 8

export default function addNewContainer(session, apiResponse, baseName) {
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
    dataNameId,
    appContainerNameId,
    appDirNameId,
    appWrapperNameId,
  ] =
  [
    'data',
    `${baseName}Container`, // APP_CONTAINER_NAME_ID if initializing
    baseName,
    `${baseName}Wrapper`,
  ].map(name => Name.create(name))

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
    nameId: appWrapperNameId,
    type: STYLED_COMPONENT,
    tag: 'div',
  })

  const appDeclId = Declaration.create({
    nameId: appDirNameId,
    invocationIds: [
      Invocation.create({
        nameId: appWrapperNameId,
        callParamIds: [],
        closed: true,
        declarationId: appWrapperDeclId,
      }),
    ],
    declParamIds,
  })

  // File.withId(COMPONENTS_FILE_ID).update({ children:
  const componentChildren = [
    File.create({ // App
      nameId: appDirNameId,
      type: DIR,
      children: [
        File.create({ // index.js
          nameId: INDEX_NAME_ID,
          declarationIds: [
            appDeclId,
          ],
        }),
        File.create({ // AppWrapper.js
          nameId: appWrapperNameId,
          declarationIds: [
            appWrapperDeclId,
          ],
        }),
      ],
    }),
  ]
  File.withId(COMPONENTS_FILE_ID).migrate({ children: old => [ ...old, ...componentChildren ] })

  const renderDataConstDeclaration = Declaration.create({
    type: CONST,
    nameId: dataNameId,
  })


  if (C.object(apiResponse)) {
    appInvocation = Invocation.create({
      nameId: appDirNameId,
      closed: true,
      declarationId: appDeclId,
      pseudoSpreadPropsNameId: dataNameId,
    })
  } else {
    const mapPseudoParamNameId = Name.create('item')

    appInvocation = Invocation.create({
      nameId: dataNameId,
      type: VAR_INVOCATION,
      declarationId: renderDataConstDeclaration,
      invocationIds: [
        Invocation.create({
          nameId: mapPseudoParamNameId,
          type: ARRAY_MAP_METHOD,
          invocationIds: [
            Invocation.create({
              nameId: appDirNameId,
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

  // sampleResponse.json
  const exampleResponseNameId = Name.create('exampleResponse')
  const responseJsonDeclaration = Declaration.create({
    type: JSON_TYPE,
    nameId: exampleResponseNameId,
    text: apiResponse,
    exportType: false,
  })

  // File.withId(CONTAINERS_FILE_ID).update({ children:
  const containerChildren = [
    File.create({
      nameId: appContainerNameId,
      type: DIR,
      children: [
        File.create({
          type: JSON_TYPE,
          nameId: exampleResponseNameId,
          declarationIds: [responseJsonDeclaration],
        }),
        File.create({
          nameId: INDEX_NAME_ID,
          declarationIds: [
            Declaration.create({
              type: CLASS_COMPONENT,
              nameId: appContainerNameId,
              declarationIds: [
                Declaration.create({
                  nameId: Name.create('state'),
                  type: CLASS_PROP,
                  declarationIds: [
                    Declaration.create({
                      nameId: dataNameId,
                      type: OBJECT_LITERAL_KEY,
                    }),
                  ],
                  invocationIds: [
                    Invocation.create({
                      nameId: exampleResponseNameId,
                      type: IMPORT_VAR,
                      declarationId: responseJsonDeclaration,
                      inline: true,
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
  ]
  File.withId(CONTAINERS_FILE_ID).migrate({ children: old => [...old, ...containerChildren] })

  // refresh session data
  orm.session({
    ...session.state,
  })

  return session.state
}
