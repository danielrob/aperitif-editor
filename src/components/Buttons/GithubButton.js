import styled from 'styled-components'

const GithubButton = styled.div`
  ${props => props.hide && 'display:none;'}
  position: fixed;
  display: inline-block;
  left: ${props => props.left};
  ${props => props.leftCalc && `left: ${props.leftCalc}`};
  bottom: 14px;
  z-index: 1;
  a {
    color: #24292e;
    text-decoration: none;
    outline: 0;
    background-color: #eff3f6;
    background-image: linear-gradient(to bottom, #fafbfc, #e4ebf0);
    background-repeat: repeat-x;
    background-size: 110% 110%;
    display: inline-block;
    font-weight: 600;
    cursor: pointer;
    border: 1px solid #d1d2d3;
    border-radius: 0.25em;
    text-decoration: none;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    font-size: 12px;
    white-space: nowrap;
    user-select: none;
    padding: 0 10px;
    height: 28px;
    line-height: 28px;
    font-size: 12px;
    vertical-align: middle;
    &:hover {
      background-color:#e6ebf1;
      background-image:linear-gradient(to bottom, #f0f3f6, #dce3ec);
      border-color:#afb1b2;
    }
  }
`

export default GithubButton
