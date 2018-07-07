import T from 'prop-types'
import { fileTypesArray, declarationTypesArray, exportTypesArray } from 'constantz'

// makeSelectInvocation
export const invocationPropTypes = T.shape({
  invocationId: T.number.isRequired,
  nameId: T.number.isRequired,
  invocationIds: T.arrayOf(T.number).isRequired,
  callParams: T.arrayOf(T.object).isRequired,
  hasPropsSpread: T.bool.isRequired,
  pseudoSpreadPropsName: T.string,
  inline: T.bool.isRequired,
})

// makeSelectParamInvocation
export const paramInvocationPropTypes = T.shape({
  invocationId: T.number.isRequired,
  callParamId: T.number.isRequired,
  nameId: T.number.isRequired,
  declIsSpreadMember: T.bool.isRequired,
  chainedInvocations: T.arrayOf(T.object),
})


// param
export const declParamPropTypes = {
  id: T.number.isRequired,
  nameId: T.number.isRequired,
  payload: T.any,
  isSpreadMember: T.bool.isRequired,
  invokeCount: T.number.isRequired,
  altIds: T.arrayOf(T.number).isRequired,
}

// makeSelectFile
export const filePropTypes = {
  fileId: T.number.isRequired,
  name: T.string.isRequired,
  nameId: T.number.isRequired,
  extension: T.string.isRequired,
  type: T.oneOf(fileTypesArray).isRequired,
  fileChildren: T.arrayOf(T.number).isRequired,
  declarationIds: T.arrayOf(T.number).isRequired,
  isDirectory: T.bool.isRequired,
  isCurrent: T.bool.isRequired,
  isSelected: T.bool.isRequired,
  isEmptyDir: T.bool.isRequired,
  containsCurrent: T.bool.isRequired,
}

// declaration
export const declarationPropTypes = T.shape({
  declarationId: T.number.isRequired,
  nameId: T.number.isRequired,
  fileId: T.number,
  type: T.oneOf(declarationTypesArray).isRequired,
  declParamIds: T.arrayOf(T.number).isRequired,
  exportType: T.oneOf(exportTypesArray).isRequired,
  declarationIds: T.arrayOf(T.number).isRequired,
  invocationIds: T.arrayOf(T.number).isRequired,
  tag: T.string,
  text: T.string,
})
