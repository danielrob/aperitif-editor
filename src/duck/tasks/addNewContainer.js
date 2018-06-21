import C from 'check-types'
import pluralize, { singular } from 'pluralize'
import invariant from 'invariant'
import orm from 'orm'
import {
  DIR,
  SC,
  JSON_TYPE,
  IMPORT_VAR,
  STYLED_COMPONENT,
  COMPONENT_INVOCATION,
  ARRAY_MAP_METHOD,
  PARAM_INVOCATION,
  CLASS_COMPONENT,
  CLASS_METHOD,
  CLASS_PROP,
  CONST,
  OBJECT_LITERAL_KEY,
  COMPONENTS_FILE_ID,
  CONTAINERS_FILE_ID,
  INDEX_NAME_ID,
  KEY_NAME_ID,
  ID_NAME_ID,
  VAR_INVOCATION,
  PROPERTY_ACCESS,
} from 'constantz'

export default function addNewContainer(session, apiResponse, _baseName) {
  const { Name, DeclParam, CallParam, Declaration, Invocation, File } = session
  const baseName = singular(_baseName)
  const isCalledApp = baseName === 'App'
  const payloadIsList = C.array.of.object(apiResponse)
  const payloadIsObject = C.object(apiResponse)
  invariant(payloadIsList || payloadIsObject, 'addNewContainer requires object or arrayOfObjects payload')

  // Names
  const [
    dataNameId,
    containerNameId,
    componentNameId,
    wrapperNameId,
  ] =
  [
    'data',
    `${payloadIsList && !isCalledApp ? pluralize(baseName) : baseName}Container`, // APP_CONTAINER_NAME_ID if initializing
    isCalledApp && payloadIsList ? 'DataItem' : baseName,
    `${isCalledApp && payloadIsList ? 'DataItem' : baseName}Wrapper`,
  ].map(name => Name.create(name))

  let listComponentNameId
  let listWrapperNameId
  if (payloadIsList) {
    let listName = pluralize(baseName) === baseName ? `${baseName}List` : pluralize(baseName)
    listName = isCalledApp ? baseName : listName
    listComponentNameId = Name.create(listName)
    listWrapperNameId = Name.create(`${listName}Wrapper`)
  }

  // declaration params
  let declParamIds
  let listComponentDeclParamId

  if (payloadIsObject) {
    [...declParamIds] = Object.keys(apiResponse).map(key =>
      DeclParam.create({
        nameId: Name.create(key),
        payload: apiResponse[key],
      })
    )
  } else {
    listComponentDeclParamId = DeclParam.create({
      nameId: dataNameId,
      payload: apiResponse,
    })

    const mergedObjectsInPayloadArray = Object.assign({}, ...apiResponse);
    [...declParamIds] = Object.keys(mergedObjectsInPayloadArray).map(key =>
      DeclParam.create({
        nameId: Name.create(key),
        payload: mergedObjectsInPayloadArray[key],
      })
    )
  }

  // declarations
  const wrapperDeclarationId = Declaration.create({
    nameId: wrapperNameId,
    type: STYLED_COMPONENT,
    tag: 'div',
  })

  const componentDeclarationId = Declaration.create({
    nameId: componentNameId,
    invocationIds: [
      Invocation.create({
        nameId: wrapperNameId,
        callParamIds: [],
        closed: true,
        declarationId: wrapperDeclarationId,
      }),
    ],
    declParamIds,
  })

  let listWrapperDeclarationId
  let listComponentDeclarationId
  if (payloadIsList) {
    const mapPseudoParamNameId = Name.create('item')

    listWrapperDeclarationId = Declaration.create({
      nameId: listWrapperNameId,
      type: STYLED_COMPONENT,
      tag: 'div',
    })

    listComponentDeclarationId = Declaration.create({
      nameId: listComponentNameId,
      invocationIds: [
        Invocation.create({
          nameId: listWrapperNameId,
          declarationId: listWrapperDeclarationId,
          invocationIds: [
            Invocation.create({
              nameId: dataNameId,
              type: PARAM_INVOCATION,
              callParamIds: [
                CallParam.create({ declParamId: listComponentDeclParamId }),
              ],
              invocationIds: [
                Invocation.create({
                  nameId: mapPseudoParamNameId,
                  type: ARRAY_MAP_METHOD,
                  invocationIds: [
                    Invocation.create({
                      nameId: componentNameId,
                      declarationId: componentDeclarationId,
                      callParamIds: [
                        CallParam.create({
                          nameId: KEY_NAME_ID,
                          valueInvocationId: Invocation.create({
                            nameId: mapPseudoParamNameId,
                            type: VAR_INVOCATION,
                            inline: true,
                            invocationIds: [
                              Invocation.create({
                                nameId: Name.create('id'),
                                type: PROPERTY_ACCESS,
                                inline: true,
                              }),
                            ],
                          }),
                        }),
                      ],
                      pseudoSpreadPropsNameId: mapPseudoParamNameId,
                      closed: true,
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
      ],
      declParamIds: [
        listComponentDeclParamId,
      ],
    })
  }

  // File.withId(COMPONENTS_FILE_ID).update({ children:
  const componentChildren = [
    File.create({ // Component
      nameId: componentNameId,
      type: DIR,
      children: [
        File.create({ // index.js
          nameId: INDEX_NAME_ID,
          declarationIds: [
            componentDeclarationId,
          ],
        }),
        File.create({ // ComponentWrapper.js
          nameId: wrapperNameId,
          type: SC,
          declarationIds: [
            wrapperDeclarationId,
          ],
        }),
      ],
    }),
  ]

  let listComponentChildren = []
  if (payloadIsList) {
    listComponentChildren = [
      File.create({ // ListComponent
        nameId: listComponentNameId,
        type: DIR,
        children: [
          File.create({ // index.js
            nameId: INDEX_NAME_ID,
            declarationIds: [
              listComponentDeclarationId,
            ],
          }),
          File.create({ // ListComponentWrapper.js
            nameId: listWrapperNameId,
            type: SC,
            declarationIds: [
              listWrapperDeclarationId,
            ],
          }),
        ],
      }),
    ]
  }

  File.withId(COMPONENTS_FILE_ID).migrate({
    children: old => [...old, ...componentChildren, ...listComponentChildren],
  })

  const renderDataConstDeclaration = Declaration.create({
    type: CONST,
    nameId: dataNameId,
  })


  /*
    invocations
  */
  let componentInvocation
  if (payloadIsObject) {
    componentInvocation = Invocation.create({
      nameId: componentNameId,
      closed: true,
      declarationId: componentDeclarationId,
      pseudoSpreadPropsNameId: dataNameId,
    })
  } else {
    componentInvocation = Invocation.create({
      nameId: listComponentNameId,
      type: COMPONENT_INVOCATION,
      declarationId: listComponentDeclarationId,
      callParamIds: [
        CallParam.create({
          nameId: dataNameId,
          valueInvocationId: Invocation.create({
            nameId: dataNameId,
            type: VAR_INVOCATION,
            inline: true,
          }),
        }),
      ],
      closed: true,
    })
  }

  // create sampleResponse.json
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
      nameId: containerNameId,
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
              nameId: containerNameId,
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
                  invocationIds: [componentInvocation],
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
