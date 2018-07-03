export const emitter = {
  listeners: [],
  addListener(l) {
    this.listeners.push(l)
  },
  removeListener(l) {
    this.listeners = this.listeners.filter(lis => lis !== l)
  },
  emit(...args) {
    this.listeners.forEach(l => l(...args))
  },
}

export default function spyMiddleware({ getState }) {
  return next => action => {
    next(action)
    emitter.emit({ action, getState })
  }
}
