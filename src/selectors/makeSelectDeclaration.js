import { createSelector } from 'reselect'
import { selectNames, selectDeclarations } from './baseSelectors'

const selectDeclaration = (state, props) => selectDeclarations(state)[props.declarationId]

const makeSelectDeclaration = () => createSelector(
  selectNames,
  selectDeclaration,
  (names, declaration) => {
    const { id, nameId, ...rest } = declaration
    return {
      declarationId: id,
      name: names[nameId],
      nameId,
      ...rest,
    }
  }
)


export default makeSelectDeclaration
