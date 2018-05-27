/* eslint-disable prefer-const */
import { createAction } from 'redux-actions'
import { singular } from 'pluralize'
import orm from 'orm'
import { createComponentBundle } from 'orm/model-utils'
import { DIR, componentDeclarationTypes, PARAM_INVOCATION, STYLED_COMPONENT } from 'constantz'
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
export const ADD_SPREAD_ATTRIBUTE_TO_COMPONENT_INVOCATION = 'ADD_SPREAD_ATTRIBUTE_TO_COMPONENT_INVOCATION'
export const CHANGE_NAME = 'CHANGE_NAME'
export const CHANGE_DECLARATION_TEXT = 'CHANGE_DECLARATION_TEXT'
export const MOVE_INVOCATION = 'MOVE_INVOCATION'
export const MERGE_FILE = 'MERGE_FILE'
export const SET_PARAM_IS_SPREAD_MEMBER_TRUE = 'SET_PARAM_IS_SPREAD_MEMBER_TRUE'
export const TOGGLE_COMPONENT_TYPE = 'TOGGLE_COMPONENT_TYPE'

export default function appReducer(state = getTestDB(), action) {
  const session = orm.session(state)
  const { Name, DeclParam, CallParam, Declaration, Invocation, File } = session

  switch (action.type) {
    case CHANGE_NAME: {
      const { nameId, value } = action.payload
      Name.withId(nameId).update(value)
      return session.state
    }


    case CHANGE_DECLARATION_TEXT: {
      const { declarationId, value } = action.payload
      Declaration.withId(declarationId).update({ text: value })
      return session.state
    }


    case TOGGLE_COMPONENT_TYPE: {
      const { declarationId, targetType } = action.payload
      Declaration.withId(declarationId).update({ type: targetType })
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


    case SET_PARAM_IS_SPREAD_MEMBER_TRUE: {
      const { paramId } = action.payload
      DeclParam.withId(paramId).update({ isSpreadMember: true })
      return session.state
    }


    case ADD_SPREAD_ATTRIBUTE_TO_COMPONENT_INVOCATION: {
      const { invocationId } = action.payload
      Invocation.withId(invocationId).update({ hasPropsSpread: true })
      return session.state
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

      return session.state
    }


    case MERGE_FILE: {
      const { sourceFileId, targetFileId } = action.payload

      const dirId = Object.keys(File.all().ref()).find(fileId =>
        File.withId(fileId).children.includes(sourceFileId)
      )

      // remove source file from directory containing it
      File.withId(dirId).children.remove(sourceFileId)

      // delete the dragged file
      const { declarationIds } = File.withId(sourceFileId).ref()
      File.delete()

      // migrate the dragged files declarations to the targetFile
      File.withId(targetFileId).migrate({ declarationIds: ids => [...ids, ...declarationIds] })

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
              callParamIds: [CallParam.create({ declParamId: paramId })]
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

export const changeFile = createAction(
  CHANGE_EDITOR_CURRENT_FILE
)

export const addAttributeToComponentInvocation = createAction(
  ADD_ATTRIBUTE_TO_COMPONENT_INVOCATION
)

export const addParamAsComponentInvocationChild = createAction(
  ADD_PARAM_AS_COMPONENT_INVOCATION_CHILD
)

export const addPropsSpreadToComponentInvocation = createAction(
  ADD_SPREAD_ATTRIBUTE_TO_COMPONENT_INVOCATION
)

export const addInvocationFromFileToCI = createAction(
  ADD_INVOCATION_FROM_FILE_TO_COMPONENT_INVOCATION
)

export const moveParamToSpread = createAction(
  SET_PARAM_IS_SPREAD_MEMBER_TRUE
)

export const moveInvocation = createAction(
  MOVE_INVOCATION
)

export const mergeFile = createAction(
  MERGE_FILE
)

export const changeName = createAction(
  CHANGE_NAME
)

export const changeDeclarationText = createAction(
  CHANGE_DECLARATION_TEXT
)

export const toggleComponentType = createAction(
  TOGGLE_COMPONENT_TYPE
)
