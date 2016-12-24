console.debug('Loading Theme');
import React from 'react';
import ReactDom from 'react-dom';

import injectTapEventPlugin from 'react-tap-event-plugin';
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

LightDMMock = require("../LightDMMock/mock/LightDMMock.js")
if(!("lightdm" in window)) {
    var LightDMMock = LightDMMock || {};
    window.lightdm = new LightDMMock(true, 0, false);
    window.lightdm.languages.push({code: 'es-ES', name: 'Spanish', territory: null});
    window.lightdm.languages.push({code: 'af-AF', name: 'Africanese', territory: null});
    window.lightdm.languages.push({code: 'ar-SR', name: 'Arabic', territory: null});
    window.lightdm.languages.push({code: 'ja-JP', name: 'Japanese', territory: null});
    window.lightdm.languages.push({code: 'zh-HK', name: 'Chinese', territory: null});

    if(!("config" in window)) {
        window.config = {
            get_bool: function(key) {
                return true;
            },
            get_str: function(key) {
                return "";
            },
            get_num: function(key) {
                return 0;
            },
        };
    }
    if(!("greeterutil" in window)) {
        window.greeterutil = {
            dirlist: function(dir) {
                return [];
            }
        }
    }
}

require("font-awesome-webpack2");
require("./less/style.less");
require("animate.css");

function init() {
    let Main = require('./components/Main.jsx').default;
    ReactDom.render( < Main / > , document.getElementById('wrapper'));
}

init();

if (module.hot) {
    module.hot.accept('./components/Main.jsx', () => requestAnimationFrame(() => {
        // flushLogs();
        init();
    }));

    // optional: mute HMR/WDS logs
    // let log = console.log,
    //     logs = [];
    // console.log = (t, ...args) => {
    //     if (typeof t === 'string' && t.match(/^\[(HMR|WDS)\]/)) {
    //         if (t.match(/(up to date|err)/i)) logs.push(t.replace(/^.*?\]\s*/m, ''), ...args);
    //     } else {
    //         log.call(console, t, ...args);
    //     }
    // };
    // let flushLogs = () => console.log(`%c🚀 ${logs.splice(0,logs.length).join(' ')}`, 'color:#888;');
}
