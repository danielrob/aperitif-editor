export const canDropPropToOpenTag = (targetCallParams, pseudoSpreadPropsName, propBeingDragged) =>
  !targetCallParams.find(({ declParamId }) => declParamId === propBeingDragged.paramId)
  && pseudoSpreadPropsName !== propBeingDragged.name
