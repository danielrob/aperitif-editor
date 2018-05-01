import styled from 'styled-as-components'

const SpreadProps = ({ isOver, params, spreadParams }) =>
  (spreadParams.length || isOver) ? `${params.length ? ', ...' : ''}props` : null

export default styled(SpreadProps).as.span`
  position: relative;
  padding: 25px 50px 25px 0;
  margin: -25px -50px -25px 0;
  color: ${props => props.isOver ? props.theme.colors.darkblue : props.theme.colors.darkgreen}
`
