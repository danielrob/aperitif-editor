/* eslint-disable prefer-const */
import {
  DIR,
  STYLED_COMPONENT,
  PARAM_INVOCATION,
  CLASS_COMPONENT,
  CLASS_METHOD,
  CLASS_PROP,
  PROJECT_INDEX,
  CONST,
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
  const REACT_CHILDREN_CALL_PARAM_ID = CallParam.create({ declParamId: 2 })

  // DeclParams
  DeclParam.create({ nameId: childrenNameId })
  const [...declParamIds] = [
    { nameId: p1, payload: true },
    { nameId: p2, payload: 'strrrrrriiing' },
    { nameId: p3, payload: null },
    { nameId: p4, payload: [{ id: 2, name: 'woot', height: '1.82m' }] },
    { nameId: p5, payload: { yes: 'yes', we: 'we', spread: 'spread', array: [] } },
    { nameId: p6, payload: 6 },
  ].map(param => DeclParam.create(param))

  // Invocations
  Invocation.create({
    nameId: childrenNameId,
    type: PARAM_INVOCATION,
    callParamIds: [REACT_CHILDREN_CALL_PARAM_ID],
  })

  Invocation.create({
    nameId: propTypesName,
    source: 'prop-types',
  })

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
                    declarationIds: [
                      Declaration.create({
                        type: CONST,
                        nameId: data,
                        text: 'this.state.data',
                      }),
                    ],
                    invocationIds: [
                      Invocation.create({
                        nameId: appDirName,
                        closed: true,
                        declarationId: appDeclId,
                        pseudoSpreadPropsNameId: data,
                      }),
                    ],
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
    rootFiles: [components, containers, indexFile],
    currentFileId: 1,
    preferences: {
      semis: true,
    },
  }
}
