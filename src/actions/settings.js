export function changeSetting(setting, index, val) {
    if (typeof val === 'undefined')
        val = index;
    return {
        setting,
        value: val,
        type: 'SETTINGCHANGE'
    };
}
