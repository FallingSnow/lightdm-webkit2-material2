#!/bin/env node

const settings = require("./settings.json");
const translator = require('mstranslator');
const jsonfile = require('jsonfile');
const path = require('path');
const en = require('../src/i18n/en.json');
const translationKeys = Object.keys(en);
const translationStrings = Object.values(en);

const targetLanguages = ['af', 'ar', 'bs-Latn', 'bg', 'ca', 'zh-CHS', 'hr', 'cs', 'da', 'nl', 'et', 'fi', 'fr', 'de', 'el', 'ht', 'he', 'hi', 'mww', 'hu', 'id', 'it', 'ja', 'sw', 'tlh', 'ko', 'lv', 'lt', 'ms', 'mt', 'no', 'fa', 'pl', 'pt', 'otq', 'ro', 'ru', 'sr-Cyrl', 'sk', 'sl', 'es', 'sv', 'th', 'tr', 'uk', 'ur', 'vi', 'cy', 'yua'];
// const targetLanguages = ['zh-CHS', 'tlh', 'sr-Cyrl'];

var client = new translator({
    client_id: settings.clientId, // use this for the old token API
    client_secret: settings.clientSecret // use this for the old token API
}, true);

for (target of targetLanguages) {
    console.log('Translating to', target);
    let params = {
        texts: translationStrings,
        from: 'en',
        to: target
    };
    let filename = path.resolve(__dirname, "../src/i18n/" + target.substring(0, 2) + '.json');
    client.translateArray(params, function(err, result) {
        if (err) {
            console.error(err);
            return;
        }

        // Manipulate resulting array
        let output = {};
        for (let translationIndex in result) {
            output[translationKeys[translationIndex]] = result[translationIndex].TranslatedText;
        }
        // Reconstruct template values
        for (let key in output) {
            if (output[key].indexOf('{') > -1) {
                output[key] = output[key].replace(/\{.+\}/, en[key].match(/\{.+\}/)[0]);
            }
        }

        jsonfile.writeFile(filename, output, function(err) {
            if (err)
                console.error(err);
        });
    });
}
