import invariant from 'invariant'

const colors = new Proxy({}, {
  get(target, name) {
    return props => {
      invariant(
        props.theme.colors[name],
        `${name} is not a color \npossible colors: ${Object.keys(props.theme.colors)}`
      )
      return props.theme.colors[name]
    }
  },
})

const themeProxy = new Proxy({}, {
  get(target, name) {
    switch (name) {
      case 'color': return colors
      case 'colors': return colors
      default: return props => {
        invariant(props.theme[name], `${name} is not a theme property`)
        return props.theme[name]
      }
    }
  },
})

export default themeProxy
