import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import IconButton from 'material-ui/IconButton';
import FontAwesome from 'react-fontawesome';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {
    Card,
    CardActions,
    CardHeader,
    CardMedia,
    CardTitle,
    CardText
} from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import Slider from 'material-ui/Slider';
import RCSlider from 'rc-slider';
import moment from 'moment';
import {FormattedMessage} from 'react-intl';
import debounce from 'lodash.debounce';

let languages = [],
    backgroundEngineMenuItems = [],
    animationMenuItems = [],
    timeZoneMenuItems = [];
for (let languageIndex in lightdm.languages) {
    languages.push(<MenuItem value={lightdm.languages[languageIndex].name} key={languageIndex} primaryText={lightdm.languages[languageIndex].name}/>);
}
const backgroundEngines = [ < span key = "trianglify" > Trianglify < /span>, <FormattedMessage key="image" id="image" defaultMessage="Image"/ >, < FormattedMessage key = "random-image" id = "randomImage" defaultMessage = "Random Image" />, < span key = "zodiac" > Zodiac < /span>];
for (let backgroundEngineIndex in backgroundEngines) {
    backgroundEngineMenuItems.push(<MenuItem value={backgroundEngines[backgroundEngineIndex].key} key={backgroundEngineIndex} primaryText={backgroundEngines[backgroundEngineIndex]}/ >);
}
const animations = [
    'fadeIn',
    'bounceIn',
    'flipInX',
    'flipInY',
    'lightSpeedIn',
    'rotateIn',
    'slideInUp',
    'slideInDown',
    'zoomIn',
    'rollIn'
];
for (let animationIndex in animations) {
    animationMenuItems.push(<MenuItem value={animations[animationIndex]} key={animationIndex} primaryText={animations[animationIndex]}/>);
}
const colorSchemes = [< MenuItem value = "random" key = "random" primaryText = { < FormattedMessage id = "randomDefault" defaultMessage = "Random (default)" />
    } />, < Divider key = "div1" />, < MenuItem value = "Blues" key = "Blues" primaryText = { < FormattedMessage id = "blues" defaultMessage = "Blues" />
    } />, < MenuItem value = "Purples" key = "Purples" primaryText = { < FormattedMessage id = "purples" defaultMessage = "Purples" />
    } />, < MenuItem value = "Oranges" key = "Oranges" primaryText = { < FormattedMessage id = "oranges" defaultMessage = "Oranges" />
    } />, < MenuItem value = "Reds" key = "Reds" primaryText = { < FormattedMessage id = "reds" defaultMessage = "Reds" />
    } />, < Divider key = "div2" />, < MenuItem value = "YlOrRd" key = "YlOrRd" primaryText = { < span > <FormattedMessage key="yellow" id="yellow" defaultMessage="Yellow"/> - <FormattedMessage key="orange" id="orange" defaultMessage="Orange"/> - <FormattedMessage key="red" id="red" defaultMessage="Red"/> < /span>
    } / >, < MenuItem value = "YlGnBu" key = "YlGnBu" primaryText = { < span > <FormattedMessage key="yellow" id="yellow" defaultMessage="Yellow"/> - <FormattedMessage key="green" id="green" defaultMessage="Green"/> - <FormattedMessage key="blue" id="blue" defaultMessage="Blue"/> < /span>
    } / >, < MenuItem value = "PuOr" key = "PuOr" primaryText = { < span > <FormattedMessage key="purple" id="purple" defaultMessage="Purple"/> - <FormattedMessage key="orange" id="orange" defaultMessage="Orange"/> < /span>
    } / >, < MenuItem value = "YlOrBr" key = "YlOrBr" primaryText = { < span > <FormattedMessage key="yellow" id="yellow" defaultMessage="Yellow"/> - <FormattedMessage key="orange" id="orange" defaultMessage="Orange"/> - <FormattedMessage key="brown" id="brown" defaultMessage="Brown"/> < /span>
    } / >];
const timeZones = moment.tz.names();
for (let timeZoneIndex in timeZones) {
    timeZoneMenuItems.push(<MenuItem value={timeZones[timeZoneIndex]} key={timeZoneIndex} primaryText={timeZones[timeZoneIndex]}/>);
}

class Settings extends React.PureComponent {
    constructor(props) {
        super(props);
        console.debug('Settings loaded.', this.props);
        this.accessableBackgroundDirectory = config.get_str('branding', 'background_images');
        console.log(this.state)
    }
    state = {
        settings: this.props.settings
    };
    goTo(destinaton) {
        let _self = this;
        return function() {
            _self.props.router.push(destinaton);
        }
    }
    isAccessable(dir) {
        return dir.indexOf(this.accessableBackgroundDirectory) === 0;
    }
    render() {
        let backgroundEngineOptions = [];
        switch (this.props.settings.backgroundEngine) {
            case 'zodiac':
                {
                    const min = 5000,
                        max = 100000;

                    if (this.props.settings.zodiacDensity < min || this.props.settings.zodiacDensity > max) {
                        this.state.zodiacDensityError = <FormattedMessage id="zodiacDensityError" defaultMessage="Density must be between {min} and {max}" values={{min, max}}/>;
                    }
                    backgroundEngineOptions.push(
                        <TextField fullWidth={true} min={min} max={max} step={5000} key="zodiacDensity" value={this.props.settings.zodiacDensity} floatingLabelText={< i className = "fa fa-cubes" > <FormattedMessage id="density" defaultMessage="Density"/> < /i>} errorText={this.state.zodiacDensityError} type="number" onChange={(e, index, val) => {
                                if (typeof val === 'undefined')
                                    val = index;
                                if (val < min || val > max) {
                                    this.setState({zodiacDensityError: <FormattedMessage id="zodiacDensityError" defaultMessage="Density must be between {min} and {max}" values={{min, max}}/>});
                                } else {
                                    this.setState({zodiacDensityError: ''});
                                }
                                this.props.changeSetting('zodiacDensity', index, val);
                        }}/>
                    );
                }
            case 'trianglify':
                {
                    backgroundEngineOptions.push(
                        <SelectField fullWidth={true} floatingLabelText={< i className = "fa fa-desktop" > <FormattedMessage id="backgroundColorScheme" defaultMessage="Background Color Scheme"/> < /i>} key="backgroundColorScheme" value={this.props.settings.backgroundColorScheme} onChange={(e, index, val) => {
                            this.props.changeSetting('backgroundColorScheme', index, val)
                        }}>
                            {colorSchemes}
                        </SelectField>
                    );
                    break;
                }
            case 'image':
                {
                    backgroundEngineOptions.push(
                        <TextField fullWidth={true} hintText="/tmp/imagesDirectory/image.jpg" errorText={this.state.imageLocationError} floatingLabelText={< i className = "fa fa-image" > <FormattedMessage id="imageLocation" defaultMessage="Image Location"/> < /i>} key="backgroundImageLocation" value={this.state.settings.backgroundImageLocation} onChange={(e, index, val) => {
                            if (typeof val === 'undefined')
                                val = index;
                            this.setState({
                                settings: {
                                    backgroundImageLocation: val
                                }
                            });
                            if (this.isAccessable(val)) {
                                this.props.changeSettingDebounce('backgroundImageLocation', index, val);
                                this.setState({imageLocationError: ""});
                            } else {
                                this.setState({
                                    imageLocationError: <span>Location is not accessable. Location must be within
                                            <span className="code">{config.get_str('branding', 'background_images')}</span>.</span>
                                });
                            }
                        }}/>
                    );
                    break;
                }
            case 'random-image':
                {
                    backgroundEngineOptions.push(
                        <TextField fullWidth={true} hintText="/tmp/imagesDirectory" errorText={this.state.imageDirectoryError} floatingLabelText={< i className = "fa fa-file-image-o" > <FormattedMessage id="imageDirectory" defaultMessage="Images Directory"/> < /i>} key="backgroundImagesDirectory" value={this.state.settings.backgroundImagesDirectory} onChange={(e, index, val) => {
                            if (typeof val === 'undefined')
                                val = index;
                            this.setState({
                                settings: {
                                    backgroundImagesDirectory: val
                                }
                            });
                            if (this.isAccessable(val)) {
                                this.props.changeSettingDebounce('backgroundImagesDirectory', index, val);
                                this.setState({imageDirectoryError: ""});
                            } else {
                                this.setState({
                                    imageDirectoryError: <span>Directory is not accessable. Directory must be within
                                            <span className="code">{config.get_str('branding', 'background_images')}</span>.</span>
                                });
                            }
                        }}/>
                    );
                    break;
                }
        }
        return (
            <Card className="card animated">
                <div className="header"><FormattedMessage id="settings" defaultMessage="Settings"/></div>
                <div className="form-container">
                    <SelectField fullWidth={true} floatingLabelText={< i className = "fa fa-language" > <FormattedMessage id="language" defaultMessage="Language"/> < /i>} value={this.props.settings.language} onChange={(e, index, val) => {
                        this.props.changeSetting('language', index, val)
                    }}>
                        {languages}
                    </SelectField>
                    <SelectField fullWidth={true} labelStyle={{
                        textTransform: 'capitalize'
                    }} floatingLabelText={< i className = "fa fa-gears" > <FormattedMessage id="backgroundEngine" defaultMessage="Background Engine"/> < /i>} value={this.props.settings.backgroundEngine} onChange={(e, index, val) => {
                        this.props.changeSetting('backgroundEngine', index, val)
                    }}>
                        {backgroundEngineMenuItems}
                    </SelectField>
                    {backgroundEngineOptions}
                    <SelectField fullWidth={true} floatingLabelText={< i className = "fa fa-clock-o" > <FormattedMessage id="clockFormat" defaultMessage="Clock Format"/> < /i>} value={this.props.settings.clockFormat} onChange={(e, index, val) => {
                        this.props.changeSetting('clockFormat', index, val)
                    }}>
                        <MenuItem value={12} primaryText={< span > 12 < FormattedMessage id = "Hour" defaultMessage = "Hour" />< /span>}/>
                        <MenuItem value={24} primaryText={< span > 24 < FormattedMessage id = "Hour" defaultMessage = "Hour" />< /span>}/>
                    </SelectField>
                    <SelectField fullWidth={true} floatingLabelText={< i className = "fa fa-clock-o" > <FormattedMessage id="timeZone" defaultMessage="Time Zone"/> < /i>} value={this.props.settings.timeZone} onChange={(e, index, val) => {
                        this.props.changeSetting('timeZone', index, val)
                    }}>
                        {timeZoneMenuItems}
                    </SelectField>
                    <SelectField fullWidth={true} floatingLabelText={< i className = "fa fa-magic" > <FormattedMessage id="animation" defaultMessage="Animation"/> < /i>} value={this.props.settings.animation} onChange={(e, index, val) => {
                        this.props.changeSetting('animation', index, val)
                    }}>
                        {animationMenuItems}
                    </SelectField>
                    <div>
                        <label><i className="fa fa-magnet"/>&nbsp;
                            <FormattedMessage id="alignment" defaultMessage="Alignment"/></label>
                        <RCSlider value={this.props.settings.alignment} onChange={(val) => {
                            this.props.changeSetting('alignment', null, val)
                        }} min={0} max={2} marks={{
                            0: <i className="fa fa-align-left"/>,
                            1: <i className="fa fa-align-center"/>,
                            2: <i className="fa fa-align-right"/>
                        }}/>
                    </div>
                    <div>
                        <label><i className="fa fa-expand"/>&nbsp;
                            <FormattedMessage id="uiScaling" defaultMessage="UI Scaling - {scale}%" values={{
                                scale: this.props.settings.scaling * 100
                            }}/></label>
                        <Slider step={.25} value={this.props.settings.scaling} onChange={(e, index, val) => {
                            this.props.changeSetting('scaling', index, val)
                        }} min={.5} max={2.5}/>
                    </div>
                </div>
                <CardActions>
                    <FlatButton icon={< i className = "fa fa-save" > </i>} style={{
                        width: 100 + '%'
                    }} onTouchTap={this.goTo('/login')} label={< FormattedMessage id = "done" defaultMessage = "Done" />}/>
                </CardActions>
            </Card>
        );
    }
}

import {changeSetting} from '../actions/settings.js';
function mapStateToProps(state) {
    return {settings: state.settings};
}

function mapDispatchToProps(dispatch) {
    return {
        changeSetting: bindActionCreators(changeSetting, dispatch),
        changeSettingDebounce: debounce(bindActionCreators(changeSetting, dispatch), 1000)
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Settings);
