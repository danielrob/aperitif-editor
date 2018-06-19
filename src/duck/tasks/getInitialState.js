import { DIR, PARAM_INVOCATION } from 'constantz'

import orm from 'orm'

export default function getInitialState() {
  const session = orm.session({})

  const {
    Name,
    DeclParam,
    CallParam,
    Invocation,
    File,
  } = session

  Name.create('index') // INDEX_NAME_ID: 1
  Name.create('key') // KEY_NAME_ID: 2
  Name.create('id') // ID_NAME_ID: 3

  const childrenNameId = Name.create('children')

  // {children} param invocation.
  // REACT_CHILDREN_INVOCATION_ID: 1
  Invocation.create({
    nameId: childrenNameId,
    type: PARAM_INVOCATION,
    callParamIds: [
      // REACT_CHILDREN_CALL_PARAM_ID: 1
      CallParam.create({
        // REACT_CHILDREN_DECLARATION_PARAM_ID: 1
        declParamId: DeclParam.create({
          nameId: childrenNameId,
        }),
      }),
    ],
  })

  const rootFiles = [
    File.create({ type: DIR, nameId: Name.create('components') }), // COMPONENTS_FILE_ID: 1
    File.create({ type: DIR, nameId: Name.create('containers') }), // CONTAINERS_FILE_ID: 2
  ]

  return {
    ...session.state,
    editor: {
      rootFiles,
      currentFileId: null,
      selectedFileId: null,
    },
    preferences: {
      semis: false,
    },
  }
}
