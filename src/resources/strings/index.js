/**
 * Attempt to detect browser's language.
 * If not set, or if language file not found, use default configured language.
 * If default configured language not found, default to English.
 */

import config from '../../config'

const userLanguage = navigator.language || navigator.userLanguage;
const { language } = config;
const availableLanguage = userLanguage || language;
let activeLanguage;

try {
  activeLanguage = require('./' + availableLanguage)['default'];
} catch(err) {
  activeLanguage = require('./en')['default'];
}

export default activeLanguage;
