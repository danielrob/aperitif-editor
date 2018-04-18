import { whatev } from 'utils'

export const required = Symbol('required')

export const fileTypes = {
  JS: whatev(),
  DIR: whatev(),
}

export const templateTypes = {
  STATELESS_FUNCTION_COMPONENT: whatev(),
  STYLED_COMPONENT: whatev(),
  STANDARD: whatev(),
}
