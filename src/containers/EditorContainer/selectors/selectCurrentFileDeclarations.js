import { createSelector } from 'reselect'

import { declarationTypes } from 'constantz'

import {
  selectInvocations,
  selectDeclParams,
} from 'selectors'

import { getCurrentFileDeclarations } from './selectors'

const { LOOKTHROUGH } = declarationTypes

export const selectCurrentFileDeclarations = createSelector(
  getCurrentFileDeclarations,
  selectDeclParams,
  selectInvocations,
  (declarations, params, invocations) =>
    declarations
      .filter(({ type }) => type !== LOOKTHROUGH)
      .map(({ id, nameId, type, invocationIds, exportType, ...rest }) => ({
        ...rest,
        declarationId: id,
        nameId,
        type,
        invocations: invocationIds.map(invocationId => invocations[invocationId]),
        exportType,
      }))
)

