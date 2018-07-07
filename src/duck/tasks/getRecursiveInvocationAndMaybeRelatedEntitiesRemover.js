import { INDEX_NAME_ID } from 'constantz'

// First attempt, possibly unstable! (Ok, _now_ I need automated tests...)
export default function getRecursiveInvocationAndMaybeRelatedEntitiesRemover(session) {
  const { DeclParam, Declaration, Invocation, File } = session

  function maybeRemoveInvocationsDeclaration(invocationId) {
    const { declarationId: targetDeclarationId } = Invocation.withId(invocationId)
    // remove any files related to that declaration
    if (
      Invocation.where(({ declarationId }) => declarationId === targetDeclarationId).length === 1
    ) {
      const { fileId } = Declaration.withId(targetDeclarationId)
      const { parentId, nameId } = File.withId(fileId)

      Declaration.declParams.forEach(id => DeclParam.withId(id).delete())
      Declaration.invocations.forEach(id => recurseOnInvocations(id))

      File.withId(fileId).declarations.remove(targetDeclarationId)

      if (!File.declarations.length) {
        File.withId(fileId).delete(nameId !== INDEX_NAME_ID && 'nameId')
      }

      if (nameId === INDEX_NAME_ID) {
        const { parentId: superId } = File.withId(parentId)
        File.withId(parentId).delete('nameId')
        File.withId(superId).children.remove(parentId)
      } else {
        File.withId(parentId).children.remove(fileId)
      }
    }

    // delete the invocation
    Invocation.withId(invocationId).delete()
  }

  function recurseOnInvocations(invocationId) {
    Invocation.withId(invocationId).invocations.forEach(id => recurseOnInvocations(id))
    maybeRemoveInvocationsDeclaration(invocationId)
  }

  return invocationId => recurseOnInvocations(invocationId)
}
