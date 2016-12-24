const languages = ['af', 'ar', 'bs-Latn', 'bg', 'ca', 'zh-CHS', 'hr', 'cs', 'da', 'nl', 'et', 'fi', 'fr', 'de', 'el', 'ht', 'he', 'hi', 'mww', 'hu', 'id', 'it', 'ja', 'sw', 'tlh', 'ko', 'lv', 'lt', 'ms', 'mt', 'no', 'fa', 'pl', 'pt', 'otq', 'ro', 'ru', 'sr-Cyrl', 'sk', 'sl', 'es', 'sv', 'th', 'tr', 'uk', 'ur', 'vi', 'cy', 'yua'];
let exportObj = {};
for (let lang of languages) {
    exportObj[lang] = require('./' + lang.substring(0, 2) + '.json');
}

export default exportObj;
