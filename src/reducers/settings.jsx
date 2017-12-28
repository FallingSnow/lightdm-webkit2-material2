const moment = require('moment');
require('moment-timezone');

function dirimages(dir)
{
    let imagesExtensions = ["jpg", "jpeg", "png"];
    function isImage(path) {
        let filename = path.substring(path.lastIndexOf("/") + 1);
        let dotPosition = filename.lastIndexOf(".");
        if (dotPosition > -1) {
            let extension = filename.substring(dotPosition + 1);
            if (imagesExtensions.indexOf(extension) > -1) {
                return true;
            }
        }
        return false;
    }
    return greeterutil.dirlist(dir).filter(isImage);
}
greeterutil.dirimages = dirimages;

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
    'backgroundImagesDirectory': config.get_str('branding', 'background_images') || config.get_str('greeter', 'background_images') || '/var/lib/AccountsService/backgrounds',
    'scaling': 1,
    'alignment': 1 // 0: left, 1: center, 2: right
};
let firstImage = greeterutil.dirimages(initialState['backgroundImagesDirectory']) ? greeterutil.dirimages(initialState['backgroundImagesDirectory'])[0] : false;
initialState['backgroundImageLocation'] = firstImage || '';

// If hide users is set with lightdm, then clear the default users
if (lightdm.hide_users)
    initialState.userName = '';

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

loadedSettings['sessionKey'] = getUserByName(loadedSettings['userName']).session || lightdm.sessions[0].key;

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
