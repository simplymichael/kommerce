/**
 * Attempt to detect browser's language.
 * If it is not set, or if a matching language file is not found,
 * use configured language (configured in 'src/.env.js' file).
 * If a language file for configured language is not found,
 * default to English (US).
 */

import env from '../../.env';

let languageFile;
let activeLanguage;
const userLanguage = navigator.language || navigator.userLanguage;
const { language } = env;

try {
  activeLanguage = userLanguage;
  languageFile = require(`./${activeLanguage}`)['default'];
} catch(err) {
  try {
    activeLanguage = language;
    languageFile = require(`./${activeLanguage}`)['default'];
  } catch(err) {
    activeLanguage = 'en-US';
    languageFile = require(`./${activeLanguage}`)['default'];
  }
}

export const currentLanguage = activeLanguage;
export default languageFile;
