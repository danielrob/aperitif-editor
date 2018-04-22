import { createSelector } from 'reselect'

import { expressionTypes } from 'constantz'

import {
  selectNames,
  selectInvocations,
  selectParams,
  getCurrentFileExpressions,
} from 'containers/App/selectors'

const { LOOKTHROUGH } = expressionTypes

export const selectCurrentFileExpressions = createSelector(
  selectNames,
  getCurrentFileExpressions,
  selectParams,
  selectInvocations,
  (names, expressions, params, invocations) =>
    expressions
      .map(({ id, nameId, type, invocationIds, paramIds, exportType }) => ({
        id,
        name: names[nameId],
        type,
        invocations: invocationIds.map(invocationId => invocations[invocationId]),
        params: paramIds.map(paramId => params[paramId]),
        exportType,
      }))
      .filter(({ type }) => type !== LOOKTHROUGH)
)
