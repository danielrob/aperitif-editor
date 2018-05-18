export const canDropPropToOpenTag = (targetCallParams, propBeingDragged) =>
  !targetCallParams.find(({ declParamId }) => declParamId === propBeingDragged.paramId)
