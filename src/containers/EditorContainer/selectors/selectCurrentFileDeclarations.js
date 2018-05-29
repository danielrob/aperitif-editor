import { createSelector } from 'reselect'

import { declarationTypes } from 'constantz'

import {
  selectNames,
  selectInvocations,
  selectParams,
} from 'selectors'

import { getCurrentFileDeclarations } from './selectors'

const { LOOKTHROUGH } = declarationTypes

export const selectCurrentFileDeclarations = createSelector(
  selectNames,
  getCurrentFileDeclarations,
  selectParams,
  selectInvocations,
  (names, declarations, params, invocations) =>
    declarations
      .filter(({ type }) => type !== LOOKTHROUGH)
      .map(({ id, nameId, type, invocationIds, declParamIds, exportType, ...rest }) => ({
        ...rest,
        declarationId: id,
        nameId,
        name: names[nameId],
        type,
        invocations: invocationIds.map(invocationId => invocations[invocationId]),
        declParams: declParamIds.map(paramId => ({
          name: names[params[paramId].nameId],
          ...params[paramId],
        })),
        exportType,
      }))
)

