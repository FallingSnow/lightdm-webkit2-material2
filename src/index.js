console.debug('Loading Theme');
import React from 'react';
import {render} from 'react-dom';

import injectTapEventPlugin from 'react-tap-event-plugin';
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

if (typeof lightdm !== 'undefined')
    lightdm = undefined;
setTimeout(() => {

    if (!("lightdm" in window)) {
        if (process.env.NODE_ENV !== 'development') {
            document.body.innerHTML += '<h1 style="background-color: white; color: red;">Lightdm did not load</h1>';
            throw new Error('lightdm did not load in time');
        } else {
            const LightDMMock = require("../LightDMMock/mock/LightDMMock.js");
            // const LightDMMock = require("../LightDMMock/src/LightDMMock.js");
            if (!("lightdm" in window)) {
                window.lightdm = new LightDMMock(true, 0, false);
                window.lightdm.languages.push({code: 'es-ES', name: 'Spanish', territory: null});
                window.lightdm.languages.push({code: 'af-AF', name: 'Africanese', territory: null});
                window.lightdm.languages.push({code: 'ar-SR', name: 'Arabic', territory: null});
                window.lightdm.languages.push({code: 'ja-JP', name: 'Japanese', territory: null});
                window.lightdm.languages.push({code: 'zh-HK', name: 'Chinese', territory: null});
                window.lightdm.languages.push({code: 'he-IS', name: 'Hebrew', territory: null});
                for (let user of lightdm.users) {
                    user.username = user.name;
                }
                console.info('Mock users loaded:', lightdm.users)
                lightdm.can_shutdown = lightdm.can_restart = lightdm.can_suspend = lightdm.can_hibernate = true;

                if (!("config" in window)) {
                    window.config = {
                        get_bool: function(key) {
                            return true;
                        },
                        get_str: function(key) {
                            return "";
                        },
                        get_num: function(key) {
                            return 0;
                        }
                    };
                }
                if (!("greeterutil" in window)) {
                    window.greeterutil = {
                        dirlist: function(dir) {
                            return undefined;
                        }
                    }
                }
            }
        }
    }
    init();
}, 10);

function init() {
    let Main = require('./components/Main.jsx').default;
    render(< Main / >, document.getElementById('wrapper'));
}

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
