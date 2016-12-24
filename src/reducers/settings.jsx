const moment = require('moment');
require('moment-timezone');

let initialState = {
    'language': lightdm.languages[0].name,
    'backgroundEngine': 'trianglify',
    'zodiacDensity': 50000,
    'backgroundColorScheme': 'random',
    'clockFormat': 24,
    'timeZone': '',
    'town': '',
    'animation': 'fadeIn',
    'animationDuration': 1000,
    'userName': lightdm.users[0].name,
    'backgroundImageLocation': '/var/lib/AccountsService/backgrounds/ayrton',
    'backgroundImagesDirectory': config.get_str('branding', 'background_images') || config.get_str('greeter', 'background_images') || '/usr/share/antergos/wallpapers',
    'scaling': 1
};

// Load settings from localStorage
let loadedSettings = {};
const settingKeys = Object.keys(initialState);
for (let setting of settingKeys) {
    let retrievedSetting = localStorage.getItem(setting);
    if (retrievedSetting) {
        let storedObj = JSON.parse(retrievedSetting);
        loadedSettings[setting] = storedObj.value;
    } else {
        loadedSettings[setting] = initialState[setting];
    }
}

if (loadedSettings['timeZone'].length === 0) {
    loadedSettings['timeZone'] = moment.tz.guess();
}

function getUserByName(name) {
    for (let user of lightdm.users) {
        if (user.name === name)
            return user;
        }
    return false;
}

loadedSettings['sessionKey'] = getUserByName(loadedSettings['userName']).session;

export default function(state = loadedSettings, action) {
    Object.freeze(state);
    if (action.type === 'SETTINGCHANGE') {

        // Also store value in localStorage
        let valToStore = JSON.stringify({value: action.value});
        localStorage.setItem(action.setting, valToStore);

        console.debug('Changed setting', action.setting, 'to', action.value);
        return Object.assign({}, state, {
            [action.setting]: action.value
        });
    }
    return state;
}
