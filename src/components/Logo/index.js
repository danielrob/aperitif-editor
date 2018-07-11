import styled from 'styled-components'
import logo from './logo.png'

const Logo = styled.img.attrs({
  src: logo,
  alt: 'logo',
})`
  width: 47px;
  height: 40px;
  margin-right: 12px;
`

export default Logo
