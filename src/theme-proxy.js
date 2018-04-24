const colors = new Proxy({}, {
  get(target, name) {
    return props => props.theme.colors[name]
  },
})

const themeProxy = new Proxy({}, {
  get(target, name) {
    switch (name) {
      case 'colors': return colors
      default: return props => props.theme[name]
    }
  },
})

export default themeProxy
