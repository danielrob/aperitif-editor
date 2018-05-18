import { COMPONENT_INVOCATION, PROP, FILE, DIR, PARAM_INVOCATION } from 'constantz'

// exported target helpers
export const getIsValidOver = monitor =>
  monitor.isOver() && !(monitor.getItemType() === FILE && !(monitor.getItem()).expressionIds.length)

export const acceptedDropTypes = [PROP, FILE, DIR, COMPONENT_INVOCATION, PARAM_INVOCATION]
