import config from '../../config'

const { language } = config;
const activeLanguage = require('./' + language)['default'];

export default activeLanguage;
