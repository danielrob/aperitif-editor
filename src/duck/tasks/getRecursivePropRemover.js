export default function getRecursivePropRemover(session) {
  const { CallParam, DeclParam, Invocation } = session

  return function recursivePropRemover(invocationId, callParamId, options = { keep: false }) {

    const callParam = CallParam.withId(callParamId)

    const callParamNameId = callParam.nameId

    // param invocation
    if (!callParamNameId) {
      const piId = CallParam.invocationId
      const pIParent = Invocation.find((id, { invocationIds }) => invocationIds.includes(piId))
      const pIParentId = pIParent.id

      Invocation.withId(pIParentId).invocations.remove(piId)
      Invocation.withId(piId).delete()
      CallParam.delete()
      return
    }

    const declParam = DeclParam.find((id, { nameId }) => nameId === callParamNameId)

    const declParamId = declParam.id

    Invocation
      .withId(invocationId)
      .declaration
      .declParams
      .remove(declParamId)


    CallParam.where(
      ({ declParamId: id }) => id === declParamId
    ).each(
      ({ invocationId, id }) => recursivePropRemover(invocationId, id)
    )

    if (!options.keep) {
      CallParam.withId(callParamId).delete()
      DeclParam.withId(declParamId).delete()
    }

    return options.keep ? declParamId : null
  }
}
