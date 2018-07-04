import C from 'check-types'
import { createAction } from 'redux-actions'
import { singular } from 'pluralize'
import { pascalCase, camelCase, oneOf } from 'utils'
import orm from 'orm'
import {
  PROPS,
  componentDeclarationTypes,
  PARAM_INVOCATION,
  STYLED_COMPONENT,
  CLASS_COMPONENT,
  CLASS_METHOD,
  STATELESS_FUNCTION_COMPONENT,
  ARRAY_MAP_METHOD,
  REACT_CHILDREN_INVOCATION_ID,
  REACT_CHILDREN_DECLARATION_PARAM_ID,
  KEY_NAME_ID,
  ID_NAME_ID,
  PROPERTY_ACCESS,
  VAR_INVOCATION,
  ES_KEYWORDS,
} from 'constantz'

import { getInitialState, initializeFromData, addNewContainer, createComponentBundle } from './tasks'

export const RESET_PROJECT = 'RESET_PROJECT'
export const INTIALIZE_APP = 'INTIALIZE_APP'
export const NEW_COMPONENT_PLEASE = 'NEW_COMPONENT_PLEASE'
export const NEW_CONTAINER_PLEASE = 'NEW_CONTAINER_PLEASE'
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
export const REMOVE_PROP = 'REMOVE_PROP'
export const REMOVE_CHILD_INVOCATION = 'REMOVE_CHILD_INVOCATION'

export default function appReducer(state, action) {
  const session = orm.session(state)
  const { Name, DeclParam, CallParam, Declaration, Invocation, File } = session

  switch (action.type) {
    case RESET_PROJECT: {
      return getInitialState()
    }

    case INTIALIZE_APP: {
      return initializeFromData(state, action.payload)
    }

    case NEW_COMPONENT_PLEASE: {
      createComponentBundle({ baseName: 'NewComponent', session })
      return session.state
    }

    case NEW_CONTAINER_PLEASE: {
      return addNewContainer(session, action.payload, 'New')
    }

    case CONVERT_TO_CLASS_COMPONENT: {
      const { declarationId } = action.payload
      const { invocationIds, declParamIds } = Declaration.withId(declarationId).ref()

      Declaration.declarations.insert(
        Declaration.create({
          nameId: Name.create('render'),
          type: CLASS_METHOD,
          invocationIds,
          declarationIds: [
            Declaration.create({ type: PROPS }),
          ],
        }),
      )
      Declaration.update({ type: CLASS_COMPONENT, declParamIds, invocationIds: [] })

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
        id => Declaration.withId(id).name.value() === 'render'
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


    case ADD_ATTRIBUTE_TO_COMPONENT_INVOCATION: {
      const {
        targetInvocationId,
        prop: { paramId },
      } = action.payload
      const { nameId, payload } = DeclParam.withId(paramId).ref()
      const copyNameId = Name.create(camelCase(Name.withId(nameId).value()))

      DeclParam.withId(paramId).incrementUsage()

      Invocation.withId(targetInvocationId).callParams.insert(
        CallParam.create({ nameId: copyNameId, declParamId: paramId }),
        0
      )

      if (Invocation.declaration) {
        Invocation.declaration.declParams.insert(DeclParam.create({ nameId: copyNameId, payload }))
      }

      return session.state
    }


    case ADD_PARAM_AS_COMPONENT_INVOCATION_CHILD: {
      const {
        targetInvocationId,
        targetPosition,
        prop: { paramId, nameId },
      } = action.payload

      DeclParam.withId(paramId).incrementUsage()

      Invocation.withId(targetInvocationId).invocations.insert(
        Invocation.create({
          nameId,
          callParamIds: [CallParam.create({ declParamId: paramId })],
          type: PARAM_INVOCATION,
        }),
        targetPosition
      )

      Invocation.update({ closed: false })

      if (Invocation.declaration.ref().type !== STYLED_COMPONENT) {
        // add children declaration param to the source declaration
        Invocation.declaration.declParams.insert(REACT_CHILDREN_DECLARATION_PARAM_ID)

        // add children invocation param to the source declarations first child
        Invocation.withId(
          Invocation.declaration.invocations.first()
        ).invocations.insert(REACT_CHILDREN_INVOCATION_ID)
        Invocation.update({ closed: false })
      }

      return session.state
    }


    case ADD_INVOCATION_FROM_FILE_TO_COMPONENT_INVOCATION: {
      const { targetInvocationId, targetPosition, fileId, isDirectory } = action.payload

      let sourceFileId = fileId
      if (isDirectory) {
        sourceFileId = File.withId(fileId).children.find(id => File.withId(id).name.value() === 'index')
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
      const dirId = File.withId(sourceFileId).ref().parentId

      // remove from that directory children
      File.withId(dirId).children.remove(sourceFileId)

      // delete the dragged file
      const { declarationIds } = File.withId(sourceFileId).ref()
      File.delete()

      // migrate the dragged files declarations to the targetFile
      File.withId(targetFileId).migrate({ declarationIds: ids => [...ids, ...declarationIds] })

      // If ony index remaining collapse e.g. App->index.js => App.js
      if (File.withId(dirId).children.length() === 1) {
        const dirsDirId = File.withId(dirId).ref().parentId
        const dirsDirRef = File.withId(dirId).ref()
        const indexFileId = dirsDirRef.children[0]

        // rename the index file to the directory name
        File.withId(indexFileId).update({
          nameId: dirsDirRef.nameId,
        })

        // remove from that directory children
        File.withId(dirsDirId).children.remove(dirId)
        // Add the previous index file instead
        File.withId(dirsDirId).children.insert(indexFileId)
      }

      return session.state
    }


    case MOVE_FILE: {
      const { targetDirectoryId, toRoot } = action.payload
      let { sourceFileId } = action.payload
      let { editor: { rootFiles } } = state

      // make any index.js that includes a component declaration a proxy to it's parent
      if (
        File.withId(sourceFileId).name.value() === 'index' &&
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
      const name = session.state.names[nameId].value

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
        Name.withId(nameId).update(`${Name.value()}${suffix || ''}`)
        alert(`${name} => ${Name.withId(nameId).value()}`) // eslint-disable-line no-alert
      }

      return {
        ...session.state,
        editor: {
          ...session.state.editor,
          rootFiles,
        },
      }
    }


    case MOVE_DECLARATION_TO_FILE: {
      const { targetDirectoryId, declarationId } = action.payload
      const { editor: { currentFileId } } = state

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

      let insertPosition = targetPosition
      if (targetInvocationId === sourceParentId) {
        const oldPosition = Invocation
          .withId(sourceParentId)
          .ref()
          .invocationIds
          .findIndex(id => id === sourceInvocationId)
        if (oldPosition < targetPosition) {
          insertPosition -= 1
        }
      }

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
        .insert(sourceInvocationId, insertPosition)

      // open target
      Invocation.update({ closed: false })

      return session.state
    }


    case ADD_NEW_STYLED_COMPONENT_TO_INVOCATION: {
      const {
        targetInvocationId,
        targetPosition,
        prop: { paramId, nameId },
      } = action.payload

      DeclParam.withId(paramId).incrementUsage()

      const name = Name.withId(nameId).value()

      const newNameId = Name.create(pascalCase(name))

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
        File.withId(id).children.includes(state.editor.currentFileId)
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
        prop: { nameId, paramId, payload },
      } = action.payload
      DeclParam.withId(paramId).incrementUsage()

      const name = Name.withId(nameId).value()

      // params
      const payloadDeclParams = Object.keys(payload).map(key =>
        DeclParam.create({
          nameId: Name.create(ES_KEYWORDS.includes(key) ? `_${key}` : key),
          payload: payload[key],
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
          pseudoSpreadPropsNameId: nameId,
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
        prop: { paramId, nameId, payload },
      } = action.payload
      DeclParam.withId(paramId).incrementUsage()
      const name = Name.withId(nameId).value()

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
            nameId: Name.create(ES_KEYWORDS.includes(key) ? `_${key}` : key),
            payload: mergedObjectsInPayloadArray[key],
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
              type: ARRAY_MAP_METHOD,
              nameId: mapPseudoParamNameId,
              invocationIds: [
                Invocation.create({
                  nameId: componentNameId,
                  declarationId: newComponentDeclarationId,
                  callParamIds: [
                    CallParam.create({
                      nameId: KEY_NAME_ID,
                      valueInvocationId: Invocation.create({
                        nameId: mapPseudoParamNameId,
                        type: VAR_INVOCATION,
                        inline: true,
                        invocationIds: [
                          Invocation.create({
                            nameId: ID_NAME_ID,
                            type: PROPERTY_ACCESS,
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
        targetPosition
      )
      Invocation.update({ closed: false, inline: false })

      return session.state
    }


    case ADD_NEW_COMPONENT_TO_INVOCATION_WITH_CHILDREN: {
      const {
        targetInvocationId,
        targetPosition,
        prop: { paramId, nameId },
      } = action.payload
      DeclParam.withId(paramId).incrementUsage()
      const baseName = Name.withId(nameId).value()

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
        prop: { paramId, nameId, payload },
      } = action.payload
      DeclParam.withId(paramId).incrementUsage()
      const baseName = Name.withId(nameId).value()
      const nameCopyId = Name.create(camelCase(baseName))

      let declParamId
      const [componentNameId, newComponentDeclarationId, wrapperInvocationId] =
        createComponentBundle({
          baseName,
          session,
          declParamIds: [
            declParamId = DeclParam.create({ nameId: nameCopyId, payload }),
          ],
        })

      if (oneOf(C.string, C.number, C.null)(payload)) {
        Invocation.withId(wrapperInvocationId).invocations.insert(
          Invocation.create({
            type: PARAM_INVOCATION,
            nameId: nameCopyId,
            callParamIds: [CallParam.create({ declParamId })],
          })
        )
        DeclParam.withId(declParamId).incrementUsage()
        Invocation.update({ closed: false })
      }

      Invocation.withId(targetInvocationId).invocations.insert(
        Invocation.create({
          nameId: componentNameId,
          callParamIds: [CallParam.create({ nameId: nameCopyId, declParamId: paramId })],
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
      Name.withId(nameId).update({ value })
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


    case REMOVE_PROP: {
      const { declarationId, altIds, invokeCount } = action.payload
      // cannot remove a decl param which has been invoked somewhere.
      if (invokeCount) {
        return session.state
      }

      const nameIds = altIds.map(id => DeclParam.withId(id).ref().nameId)
      if (Object.keys(CallParam.where(({ nameId }) => nameIds.includes(nameId)).ref()).length > 1) {
        if (!confirm('this prop is passed by multiple useages of this component, confirm deletion?')) { // eslint-disable-line
          return session.state
        }
      }

      altIds.forEach(paramId => {
        const { nameId: declParamNameId } = DeclParam.withId(paramId).ref()
        // remove declParam
        DeclParam.delete()
        // remove declParam from the component declaration's declParams
        Declaration.withId(declarationId).declParams.remove(paramId)
        // get all invocations of the component declaration in question
        Invocation
          .where(({ declarationId: dId }) => dId === declarationId)
          // for each
          .each(({ id: invocationId, callParamIds }) => {
            // find any (the) passed prop (callParam) with same effective nameId
            const sourceCallParamId = callParamIds.find(id =>
              CallParam.withId(id).ref().nameId === declParamNameId
            )
            if (sourceCallParamId) {
              // remove it, and remove it from the invocation callParams
              Invocation.withId(invocationId).callParams.remove(sourceCallParamId)
              CallParam.withId(sourceCallParamId).delete()
            }
          })
      })
      return session.state
    }


    case REMOVE_CHILD_INVOCATION: {
      const { sourceInvocationId, sourceParentId } = action.payload
      // remove source from parent
      Invocation.withId(sourceParentId).invocations.remove(sourceInvocationId)
      // and close parent if need be
      Invocation.migrate({ closed: (_, { invocationIds }) => !invocationIds.length })
      // remove any call params
      Invocation.withId(sourceInvocationId).callParams.forEach(id => {
        const { declParamId } = CallParam.withId(id).ref()
        if (declParamId) {
          DeclParam.withId(declParamId).decrementUsage()
        }
        CallParam.delete()
      })
      // delete the invocation
      Invocation.withId(sourceInvocationId).delete()
      return session.state
    }

    default:
      return state
  }
}

export const resetProject = createAction(
  RESET_PROJECT
)

export const initializeApp = createAction(
  INTIALIZE_APP
)

export const newComponentPlease = createAction(
  NEW_COMPONENT_PLEASE
)

export const newContainerPlease = createAction(
  NEW_CONTAINER_PLEASE
)

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

export const removeProp = createAction(
  REMOVE_PROP
)

export const removeChildInvocation = createAction(
  REMOVE_CHILD_INVOCATION
)
