import T from 'prop-types'

// makeSelectInvocation
export const invocationPropTypes = T.shape({
  invocationId: T.number.isRequired,
  name: T.string.isRequired,
  nameId: T.number.isRequired,
  childInvocations: T.arrayOf(T.object).isRequired,
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
