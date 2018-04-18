/**
 * i18n.js
 *
 * This will setup the i18n language files and locale data for your app.
 *
 */
import { addLocaleData } from 'react-intl'
import enLocaleData from 'react-intl/locale-data/en'
import deLocaleData from 'react-intl/locale-data/de'
import frLocaleData from 'react-intl/locale-data/fr'

import enTranslationMessages from './translations/en.json'
import frTranslationMessages from './translations/fr.json'
import deTranslationMessages from './translations/de.json'

addLocaleData(enLocaleData)
addLocaleData(deLocaleData)
addLocaleData(frLocaleData)

// fallback locale if users locale isn't found
export const DEFAULT_LOCALE = 'en'

export const appLocales = [
  'en',
  'de',
  'fr',
]

export const formatTranslationMessages = (locale, messages) => {
  const defaultFormattedMessages = locale !== DEFAULT_LOCALE
    ? formatTranslationMessages(DEFAULT_LOCALE, enTranslationMessages)
    : {}
  return Object.keys(messages).reduce((formattedMessages, key) => {
    const formattedMessage = !messages[key] && locale !== DEFAULT_LOCALE
      ? defaultFormattedMessages[key]
      : messages[key]
    return Object.assign(formattedMessages, { [key]: formattedMessage })
  }, {})
}

export const translationMessages = {
  en: formatTranslationMessages('en', enTranslationMessages),
  de: formatTranslationMessages('de', deTranslationMessages),
  fr: formatTranslationMessages('fr', frTranslationMessages),
}

