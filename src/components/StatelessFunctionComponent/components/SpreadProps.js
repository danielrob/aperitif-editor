import styled from 'styled-as-components'

const SpreadProps = ({ isOver, params, spreadProps }) =>
  (spreadProps.length || isOver) ? `${params.length ? ', ' : ''}...props` : null

export default styled(SpreadProps).as.span`
  padding: 25px 50px 25px 0;
  margin: -25px -50px -25px 0;
`
