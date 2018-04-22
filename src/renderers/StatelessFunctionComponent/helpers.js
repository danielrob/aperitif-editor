export const sortProps = ({ name: propA }, { name: propB }) => {
  if (propA === 'id' || propB === 'id') {
    return propB === 'id'
  }
  if (propA.includes('Id') || propB.includes('Id')) {
    return propB.includes('Id')
  }
  return propA > propB
}
