import React from 'react';
import {connect} from 'react-redux';
import Clock from 'react-clockwall';
import Trianglify from './background/Trianglify.jsx';
import Zodiac from './background/Zodiac.jsx';
import RandomImage from './background/RandomImage.jsx';
import Image from './background/Image.jsx';

const Denque = require("denque");

const Style = {
    backgroundColor: '#04678D',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundSize: 'cover'
};

class FPSCounter {
    constructor(resolution = 120) {
        this.resolution = resolution;
        this.frameTimes = new Denque();
    }
    tick(now) {
        if (this.frameTimes.length > this.resolution) {
            this.frameTimes.shift();
        }
        this.frameTimes.push(now - this.last);
        this.last = now;
    }
    fps() {
        let total = 0,
            times = this.frameTimes.toArray();
        for (let i = 0; i < times.length; i++) {
            total += times[i];
        }
        return 1000 / (total / times.length);
    }
    loop(now) {
        this.animationRequest = requestAnimationFrame(this.loop.bind(this));
        this.tick(now);
    }
    start() {
        this.last = performance.now();
        this.animationRequest = requestAnimationFrame(this.loop.bind(this));
        return this;
    }
    stop() {
        cancelAnimationFrame(this.animationRequest);
        return this;
    }
}
function getLanguageCodeByName(name) {
    for (let language of lightdm.languages) {
        if (language.name === name)
            return language.code;
        }
    return 'en';
}

class Background extends React.PureComponent {
    constructor(props) {
        super(props);
        console.debug('Background loaded.', this.props);
        this.style = Style;
        this.updateBackground();
        this.updateClock();
        this.watchFps(20);
    }
    componentWillUpdate(nextProps, nextState) {
        const cSettings = this.props.settings,
            nSettings = nextProps.settings;
        if (cSettings.backgroundEngine !== nSettings.backgroundEngine || cSettings.backgroundColorScheme !== nSettings.backgroundColorScheme || cSettings.backgroundImageLocation !== nSettings.backgroundImageLocation || cSettings.backgroundImagesDirectory !== nSettings.backgroundImagesDirectory || cSettings.zodiacDensity !== nSettings.zodiacDensity)
            this.updateBackground(nSettings);
        if (cSettings.clockFormat !== nSettings.clockFormat || cSettings.timeZone !== nSettings.timeZone || cSettings.town !== nSettings.town || cSettings.meridiem !== nSettings.meridiem || cSettings.language !== nSettings.language)
            this.updateClock(nSettings);
        return true;
    }
    updateBackground(settings = this.props.settings) {
        this.background = null;
        switch (settings.backgroundEngine) {
            case 'zodiac':
                this.background = <Zodiac colors={settings.backgroundColorScheme} density={settings.zodiacDensity}/>;
                break;
            case 'image':
                this.background = <Image path={settings.backgroundImageLocation}/>;
                break;
            case 'random-image':
                this.background = <RandomImage directory={settings.backgroundImagesDirectory}/>;
                break;
            default:
                this.background = <Trianglify colors={settings.backgroundColorScheme}/>;
                break;
        }
        console.debug('Updated background. New engine:', settings.backgroundEngine);
    }
    updateClock(settings = this.props.settings) {
        let locale = getLanguageCodeByName(settings.language).substring(0, 2);
        if (locale === 'zh')
            locale += '-cn';
        console.debug('Clock Locale set to:', locale);
        this.clock = <Clock config={{
            id: 'background-clock',
            timezone: settings.timeZone,
            town: settings.town,
            showTown: settings.town
                ? true
                : false,
            showTimezone: true,
            showDate: true,
            locale,
            meridiem: settings.clockFormat === 12
        }}/>;
    }
    watchFps(minTarget = 30) {
        // minTarget = minimum allowed fps

        let counter = new FPSCounter(200).start();

        setInterval(function() {
            let curFPS = counter.fps();
            if (curFPS < minTarget)
                console.warn('Current FPS', Math.round(curFPS), 'is less than the minimum target FPS', minTarget);
            }
        , 1500);
    }
    render() {
        return (
            <div style={Style}>
                {this.background}
                {this.clock}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        settings: {
            language: state.settings.language,
            backgroundEngine: state.settings.backgroundEngine,
            backgroundColorScheme: state.settings.backgroundColorScheme,
            zodiacDensity: state.settings.zodiacDensity,
            backgroundImageLocation: state.settings.backgroundImageLocation,
            backgroundImagesDirectory: state.settings.backgroundImagesDirectory,
            clockFormat: state.settings.clockFormat,
            timeZone: state.settings.timeZone,
            town: state.settings.town
        }
    };
}

export default connect(mapStateToProps)(Background);
