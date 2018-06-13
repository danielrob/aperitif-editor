import T from 'prop-types'

// makeSelectInvocation
export const invocationPropTypes = T.shape({
  invocationId: T.number.isRequired,
  name: T.string.isRequired,
  nameId: T.number.isRequired,
  invocationIds: T.arrayOf(T.number).isRequired,
  callParams: T.arrayOf(T.object).isRequired,
  hasPropsSpread: T.bool.isRequired,
  pseudoSpreadPropsName: T.string,
  closed: T.bool.isRequired,
  inline: T.bool.isRequired,
})

// makeSelectParamInvocation
export const paramInvocationPropTypes = T.shape({
  invocationId: T.number.isRequired,
  callParamId: T.number.isRequired,
  name: T.string.isRequired,
  declIsSpreadMember: T.bool.isRequired,
  chainedInvocations: T.arrayOf(T.object),
})


// param
export const paramPropTypes = {
  id: T.number.isRequired,
  name: T.string.isRequired,
  nameId: T.number.isRequired,
  payload: T.any,
  isSpreadMember: T.bool.isRequired,
  count: T.number.isRequired,
  assignNameId: T.number,
}
