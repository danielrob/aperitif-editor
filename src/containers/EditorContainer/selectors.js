import { createSelector } from 'reselect'

import { expressionTypes } from 'constantz'

import {
  selectNames,
  selectInvocations,
  selectParams,
  getCurrentFileExpressions,
} from 'selectors'

const { LOOKTHROUGH } = expressionTypes

export const selectCurrentFileExpressions = createSelector(
  selectNames,
  getCurrentFileExpressions,
  selectParams,
  selectInvocations,
  (names, expressions, params, invocations) =>
    expressions
      .filter(({ type }) => type !== LOOKTHROUGH)
      .map(({ id, nameId, type, invocationIds, paramIds, exportType, ...rest }) => ({
        ...rest,
        id,
        nameId,
        name: names[nameId],
        type,
        invocations: invocationIds.map(invocationId => invocations[invocationId]),
        params: paramIds.map(paramId => ({
          name: names[params[paramId].nameId],
          ...params[paramId],
        })),
        exportType,
      }))
)
