/* eslint-disable prefer-const */
import { createAction } from 'redux-actions'
import { singular } from 'pluralize'
import orm from 'orm'
import { createComponentBundle } from 'orm/model-utils'
import {
  DIR,
  CONST,
  componentDeclarationTypes,
  PARAM_INVOCATION,
  STYLED_COMPONENT,
  CLASS_COMPONENT,
  CLASS_METHOD,
  STATELESS_FUNCTION_COMPONENT,
} from 'constantz'
import { capitalize } from 'utils'

import getTestDB, {
  REACT_CHILDREN_INVOCATION_ID,
  REACT_CHILDREN_DECLARATION_PARAM_ID,
  KEY_NAME_ID,
  ID_NAME_ID,
} from './getTestDB'

// Editor
export const CHANGE_EDITOR_CURRENT_FILE = 'CHANGE_EDITOR_CURRENT_FILE'

// ORM
export const ADD_NEW_COMPONENT_TO_INVOCATION_WITH_CHILDREN = 'ADD_NEW_COMPONENT_TO_INVOCATION_WITH_CHILDREN'
export const ADD_NEW_COMPONENT_TO_INVOCATION_WITH_ATTRIBUTE = 'ADD_NEW_COMPONENT_TO_INVOCATION_WITH_ATTRIBUTE'
export const ADD_NEW_COMPONENT_TO_INVOCATION_WITH_SPREAD = 'ADD_NEW_COMPONENT_TO_INVOCATION_WITH_SPREAD'
export const ADD_NEW_COMPONENT_TO_INVOCATION_WITH_MAP = 'ADD_NEW_COMPONENT_TO_INVOCATION_WITH_MAP'
export const ADD_NEW_STYLED_COMPONENT_TO_INVOCATION = 'ADD_NEW_STYLED_COMPONENT_TO_INVOCATION'
export const ADD_ATTRIBUTE_TO_COMPONENT_INVOCATION = 'ADD_ATTRIBUTE_TO_COMPONENT_INVOCATION'
export const ADD_INVOCATION_FROM_FILE_TO_COMPONENT_INVOCATION = 'ADD_INVOCATION_FROM_FILE_TO_COMPONENT_INVOCATION'
export const ADD_PARAM_AS_COMPONENT_INVOCATION_CHILD = 'ADD_PARAM_AS_COMPONENT_INVOCATION_CHILD'
export const MOVE_INVOCATION = 'MOVE_INVOCATION'
export const MOVE_FILE = 'MOVE_FILE'
export const MERGE_FILE = 'MERGE_FILE'
export const MOVE_DECLARATION_TO_FILE = 'MOVE_DECLARATION_TO_FILE'
export const CONVERT_TO_CLASS_COMPONENT = 'CONVERT_TO_CLASS_COMPONENT'
export const CONVERT_TO_STATELESS_FUNCTION_COMPONENT = 'CONVERT_TO_STATELESS_FUNCTION_COMPONENT'
export const UPDATE_INVOCATION = 'UPDATE_INVOCATION'
export const UPDATE_NAME = 'UPDATE_NAME'
export const UPDATE_DECLARATION = 'UPDATE_DECLARATION'
export const UPDATE_DECL_PARAM = 'UPDATE_DECL_PARAM'
export const UPDATE_PREFERENCES = 'UPDATE_PREFERENCES'

export default function appReducer(state = getTestDB(), action) {
  const session = orm.session(state)
  const { Name, DeclParam, CallParam, Declaration, Invocation, File } = session

  switch (action.type) {
    case CONVERT_TO_CLASS_COMPONENT: {
      const { declarationId } = action.payload
      const { invocationIds, declParamIds } = Declaration.withId(declarationId).ref()

      Declaration.declarations.insert(
        Declaration.create({
          nameId: Name.create('render'),
          type: CLASS_METHOD,
          invocationIds,
          declarationIds: [
            Declaration.create({
              type: CONST,
              declParamIds,
            }),
          ],
        }),
      )
      Declaration.update({ type: CLASS_COMPONENT, invocationIds: [] })

      return session.state
    }


    case CONVERT_TO_STATELESS_FUNCTION_COMPONENT: {
      const { declarationId } = action.payload

      Declaration.withId(declarationId)

      // noop if there is more than a render method
      if (Declaration.ref().declarationIds.length > 1) {
        return session.state
      }

      const renderDeclId = Declaration.declarations.find(
        id => Declaration.withId(id).name.ref() === 'render'
      )

      const { declarationIds: constId, invocationIds } = Declaration.withId(renderDeclId).ref()
      Declaration.delete()

      const { declParamids } = Declaration.withId(constId).ref()
      Declaration.delete()

      Declaration.withId(declarationId).update({
        type: STATELESS_FUNCTION_COMPONENT,
        declarationIds: [],
        invocationIds,
        declParamids,
      })

      return session.state
    }


    case CHANGE_EDITOR_CURRENT_FILE: {
      const { currentFileId, files, names } = state
      let { payload: nextId } = action
      const { type, children } = files[nextId]

      if (type === DIR) {
        nextId = children.find(fileId => names[files[fileId].nameId].includes('index'))
      }

      return {
        ...state,
        currentFileId: nextId || currentFileId,
      }
    }


    case ADD_ATTRIBUTE_TO_COMPONENT_INVOCATION: {
      const {
        targetInvocationId,
        prop: { paramId },
      } = action.payload
      const { nameId, payload } = DeclParam.withId(paramId).ref()

      Invocation.withId(targetInvocationId).callParams.insert(
        CallParam.create({ declParamId: paramId }),
        0
      )

      if (Invocation.declaration) {
        const nameMatchParamId = Invocation.declaration.declParams.find(
          id => state.params[id].nameId === nameId
        )

        if (nameMatchParamId) {
          DeclParam.withId(nameMatchParamId).migrate({ count: count => (count ? count + 1 : 1) })
        } else {
          Invocation.declaration.declParams.insert(DeclParam.create({ nameId, count: 1, payload }))
        }
      }

      return session.state
    }


    case ADD_PARAM_AS_COMPONENT_INVOCATION_CHILD: {
      const {
        targetInvocationId,
        targetPosition,
        prop: { paramId, nameId },
      } = action.payload

      Invocation.withId(targetInvocationId).invocations.insert(
        Invocation.create({
          nameId,
          callParamIds: [CallParam.create({ declParamId: paramId })],
          type: PARAM_INVOCATION,
        }),
        targetPosition
      )

      Invocation.update({ closed: false })

      return session.state
    }


    case ADD_INVOCATION_FROM_FILE_TO_COMPONENT_INVOCATION: {
      const { targetInvocationId, targetPosition, fileId, isDirectory } = action.payload

      let sourceFileId = fileId
      if (isDirectory) {
        sourceFileId = File.withId(fileId).children.find(id => File.withId(id).name.ref() === 'index')
      }

      const declarationId = File.withId(sourceFileId).declarations.find(id =>
        componentDeclarationTypes.includes(Declaration.withId(id).ref().type)
      )

      Invocation.withId(targetInvocationId).invocations.insert(
        Invocation.create({
          nameId: Declaration.withId(declarationId).ref().nameId,
          closed: true,
          declarationId,
        }),
        targetPosition
      )

      Invocation.update({
        closed: false,
        inline: false,
      })

      return session.state
    }


    case MERGE_FILE: {
      const { sourceFileId, targetFileId } = action.payload

      // find directory containing source file
      const dirId = Object.keys(File.all().ref()).find(fileId =>
        File.withId(fileId).children.includes(sourceFileId)
      )

      // remove from that directory children
      File.withId(dirId).children.remove(sourceFileId)

      // delete the dragged file
      const { declarationIds } = File.withId(sourceFileId).ref()
      File.delete()

      // migrate the dragged files declarations to the targetFile
      File.withId(targetFileId).migrate({ declarationIds: ids => [...ids, ...declarationIds] })

      return session.state
    }


    case MOVE_FILE: {
      const { targetDirectoryId, toRoot } = action.payload
      let { sourceFileId } = action.payload
      let { rootFiles } = state

      // make any index.js that includes a component declaration a proxy to it's parent
      if (
        File.withId(sourceFileId).name.ref() === 'index' &&
        File.declarations.find(
          id => componentDeclarationTypes.includes(Declaration.withId(id).ref().type)
        )
      ) {
        sourceFileId = File.ref().parentId
        if (targetDirectoryId === sourceFileId) {
          return state
        }
      }

      // The guts of the move
      if (rootFiles.includes(sourceFileId)) {
        rootFiles = rootFiles.filter(id => id !== sourceFileId)
      } else {
        File.find((id, ref) => ref.children.includes(sourceFileId)).children.remove(sourceFileId)
      }

      if (toRoot) {
        rootFiles = [...rootFiles, sourceFileId]
        File.withId(sourceFileId).update({ parentId: undefined })
      } else {
        File.withId(targetDirectoryId).children.insert(sourceFileId)
      }

      const { nameId, type } = session.state.files[sourceFileId]
      const name = session.state.names[nameId]

      // Name clash concerns - chose to take the path of auto-renaming with alert
      let suffix = 0
      const findTakenName = id => {
        const { nameId: childNameId, type: childType } = session.state.files[id]
        const childName = session.state.names[childNameId]
        return (
          id !== sourceFileId &&
          `${name}${suffix || ''}` === childName &&
          type === childType
        )
      }

      const targetNameChildIds = toRoot ?
        rootFiles :
        File.withId(targetDirectoryId).children

      while (targetNameChildIds.find(findTakenName)) {
        suffix += 1
      }

      if (suffix) {
        Name.withId(nameId).update(`${Name.ref()}${suffix || ''}`)
        alert(`${name} => ${Name.withId(nameId).ref()}`) // eslint-disable-line no-alert
      }

      return {
        ...session.state,
        rootFiles,
      }
    }


    case MOVE_DECLARATION_TO_FILE: {
      const { targetDirectoryId, declarationId } = action.payload
      const { currentFileId } = state

      const { nameId } = Declaration.withId(declarationId).ref()

      if (File.withId(currentFileId).declarations.length() === 1) {
        return session.state
      }

      File.withId(targetDirectoryId).children.insert(
        File.create({
          nameId,
          declarationIds: [declarationId],
        })
      )

      File.withId(currentFileId).declarations.remove(declarationId)

      return session.state
    }


    case MOVE_INVOCATION: {
      const {
        sourceParentId,
        sourceInvocationId,
        targetInvocationId,
        targetPosition,
      } = action.payload

      // remove from source
      Invocation
        .withId(sourceParentId)
        .invocations
        .remove(sourceInvocationId)

      // possibly close source
      Invocation.migrate({ closed: (_, ref) => !ref.invocationIds.length })

      // add to target
      Invocation
        .withId(targetInvocationId)
        .invocations
        .insert(sourceInvocationId, targetPosition)

      // open target
      Invocation.update({ closed: false })

      return session.state
    }


    case ADD_NEW_STYLED_COMPONENT_TO_INVOCATION: {
      const {
        targetInvocationId,
        targetPosition,
        prop: { paramId, name, nameId },
      } = action.payload

      const newNameId = Name.create(capitalize(name))

      const newDeclarationId = Declaration.create({
        nameId: newNameId,
        type: STYLED_COMPONENT,
        tag: 'div',
      })

      // Add new invocation to targetInvocation with param invocation child
      Invocation.withId(targetInvocationId).invocations.insert(
        Invocation.create({
          nameId: newNameId,
          invocationIds: [
            Invocation.create({
              nameId,
              type: PARAM_INVOCATION,
              callParamIds: [CallParam.create({ declParamId: paramId })],
            }),
          ],
          declarationId: newDeclarationId,
          inline: true,
        }),
        targetPosition
      )
      Invocation.update({ closed: false, inline: false })

      // find the current directory
      const dirId = Object.keys(File.all().ref()).find(id =>
        File.withId(id).children.includes(state.currentFileId)
      )

      // insert new file with the declaration into directory
      File.withId(dirId).children.insert(
        File.create({ nameId: newNameId, declarationIds: [newDeclarationId] })
      )

      return session.state
    }


    case ADD_NEW_COMPONENT_TO_INVOCATION_WITH_SPREAD: {
      const {
        targetInvocationId,
        targetPosition,
        prop: { name, payload },
      } = action.payload

      // params
      const payloadDeclParams = Object.keys(payload).map(key =>
        DeclParam.create({
          nameId: Name.create(key),
          payload: payload[key],
          count: 1,
        })
      )

      const [componentNameId, newComponentDeclarationId] = createComponentBundle({
        baseName: name,
        session,
        declParamIds: payloadDeclParams,
        invocationIds: [],
      })

      Invocation.withId(targetInvocationId).invocations.insert(
        Invocation.create({
          nameId: componentNameId,
          declarationId: newComponentDeclarationId,
          callParamIds: [],
          pseudoSpreadPropsNameId: Name.create(name),
          closed: true,
        }),
        targetPosition
      )

      Invocation.update({ closed: false, inline: false })

      return session.state
    }


    case ADD_NEW_COMPONENT_TO_INVOCATION_WITH_MAP: {
      const {
        targetInvocationId,
        targetPosition,
        prop: { paramId, name, nameId, payload },
      } = action.payload

      // payload is certfied checkTypes.array.of.object 🚀
      // some level of uniformity in payload data is assumed
      const mergedObjectsInPayloadArray = Object.assign({}, ...payload)
      const baseName = singular(name)
      const mapPseudoParamNameId = Name.create(baseName)

      const [componentNameId, newComponentDeclarationId] = createComponentBundle({
        baseName,
        session,
        declParamIds: Object.keys(mergedObjectsInPayloadArray).map(key =>
          DeclParam.create({
            nameId: Name.create(key),
            payload: mergedObjectsInPayloadArray[key],
            count: 1,
          })
        ),
        invocationIds: [],
      })

      Invocation.withId(targetInvocationId).invocations.insert(
        Invocation.create({
          nameId,
          type: PARAM_INVOCATION,
          callParamIds: [CallParam.create({ declParamId: paramId })],
          invocationIds: [
            Invocation.create({
              nameId: componentNameId,
              declarationId: newComponentDeclarationId,
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
        targetPosition
      )
      Invocation.update({ closed: false, inline: false })

      return session.state
    }


    case ADD_NEW_COMPONENT_TO_INVOCATION_WITH_CHILDREN: {
      const {
        targetInvocationId,
        targetPosition,
        prop: { paramId, name: baseName, nameId },
      } = action.payload

      const [componentNameId, newComponentDeclarationId] = createComponentBundle({
        baseName,
        session,
        declParamIds: [REACT_CHILDREN_DECLARATION_PARAM_ID],
        invocationIds: [REACT_CHILDREN_INVOCATION_ID],
      })

      Invocation.withId(targetInvocationId).invocations.insert(
        Invocation.create({
          nameId: componentNameId,
          declarationId: newComponentDeclarationId,
          invocationIds: [
            Invocation.create({
              nameId,
              type: PARAM_INVOCATION,
              callParamIds: [CallParam.create({ declParamId: paramId })],
            }),
          ],
        }),
        targetPosition
      )
      Invocation.update({ closed: false, inline: false })

      return session.state
    }


    case ADD_NEW_COMPONENT_TO_INVOCATION_WITH_ATTRIBUTE: {
      const {
        targetInvocationId,
        targetPosition,
        prop: { paramId, name: baseName, nameId, payload },
      } = action.payload

      const [componentNameId, newComponentDeclarationId] = createComponentBundle({
        baseName,
        session,
        declParamIds: [DeclParam.create({ nameId, payload })],
      })

      Invocation.withId(targetInvocationId).invocations.insert(
        Invocation.create({
          nameId: componentNameId,
          callParamIds: [CallParam.create({ declParamId: paramId })],
          declarationId: newComponentDeclarationId,
          closed: true,
        }),
        targetPosition
      )
      Invocation.update({ closed: false, inline: false })

      return session.state
    }


    case UPDATE_NAME: {
      const { nameId, value } = action.payload
      Name.withId(nameId).update(value)
      return session.state
    }


    case UPDATE_DECLARATION: {
      const { declarationId, ...declaration } = action.payload
      Declaration.withId(declarationId).update(declaration)
      return session.state
    }


    case UPDATE_DECL_PARAM: {
      const { paramId, ...updates } = action.payload
      DeclParam.withId(paramId).update(updates)
      return session.state
    }


    case UPDATE_INVOCATION: {
      const { invocationId, ...updates } = action.payload
      Invocation.withId(invocationId).update(updates)
      return session.state
    }

    case UPDATE_PREFERENCES: {
      return {
        ...state,
        preferences: {
          ...state.preferences,
          ...action.payload,
        },
      }
    }


    default:
      return state
  }
}

export const addNewComponentToInvocationWithChildren = createAction(
  ADD_NEW_COMPONENT_TO_INVOCATION_WITH_CHILDREN
)

export const addNewComponentToInvocationWithAttribute = createAction(
  ADD_NEW_COMPONENT_TO_INVOCATION_WITH_ATTRIBUTE
)

export const addNewComponentToInvocationWithSpread = createAction(
  ADD_NEW_COMPONENT_TO_INVOCATION_WITH_SPREAD
)

export const addNewComponentToInvocationWithMap = createAction(
  ADD_NEW_COMPONENT_TO_INVOCATION_WITH_MAP
)

export const addNewStyledComponentToInvocation = createAction(
  ADD_NEW_STYLED_COMPONENT_TO_INVOCATION
)

export const addAttributeToComponentInvocation = createAction(
  ADD_ATTRIBUTE_TO_COMPONENT_INVOCATION
)

export const addParamAsComponentInvocationChild = createAction(
  ADD_PARAM_AS_COMPONENT_INVOCATION_CHILD
)

export const addInvocationFromFileToCI = createAction(
  ADD_INVOCATION_FROM_FILE_TO_COMPONENT_INVOCATION
)

export const moveInvocation = createAction(
  MOVE_INVOCATION
)

export const mergeFile = createAction(
  MERGE_FILE
)

export const moveFile = createAction(
  MOVE_FILE
)

export const moveDeclarationToFile = createAction(
  MOVE_DECLARATION_TO_FILE,
)

export const convertToClassCompmonent = createAction(
  CONVERT_TO_CLASS_COMPONENT
)

export const convertToStatelessFunctionComponent = createAction(
  CONVERT_TO_STATELESS_FUNCTION_COMPONENT
)

export const changeFile = createAction(
  CHANGE_EDITOR_CURRENT_FILE
)

export const changeName = createAction(
  UPDATE_NAME
)

export const updateDeclaration = createAction(
  UPDATE_DECLARATION,
)

export const moveParamToSpread = createAction(
  UPDATE_DECL_PARAM,
  ({ paramId }) => ({
    paramId,
    isSpreadMember: true,
  })
)

export const addPropsSpreadToComponentInvocation = createAction(
  UPDATE_INVOCATION,
  ({ invocationId }) => ({
    invocationId,
    hasPropsSpread: true,
  })
)

export const updatePreferences = createAction(
  UPDATE_PREFERENCES
)
