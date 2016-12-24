import React from 'react';
import {connect} from 'react-redux';

const Style = {
    position: 'fixed',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width: 100 + 'vw',
    height: 100 + 'vh',
    backgroundSize: 'cover'
};

class RandomImage extends React.Component {
    constructor(props) {
        super(props);
        console.debug('RandomImage loaded.', this.props);
        if (!this.props.directory)
            return console.error('Images directory could not be found in lightdm-webkit2 configuration.');

        this.imagePaths = greeterutil.dirlist(this.props.directory);
    }
    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.settings.backgroundImagesDirectory !== nextProps.settings.backgroundImagesDirectory)
            return true;
        return false;
    }
    getRandomPath() {
        let imageIndex = Math.floor(Math.random() * this.imagePaths.length);
        return this.imagePaths[imageIndex];
    }
    render() {
        const computedStyle = Object.assign({}, Style, {
            backgroundImage: 'url(\'file:///' + this.getRandomPath() + '\'), url(\'' + require('../../static/no-mans-sky.jpg') + '\')'
        });
        return (<div style={computedStyle} id="random-image"/>)
    }
}

function mapStateToProps(state) {
    return {
        settings: {
            backgroundEngine: state.settings.backgroundEngine,
            backgroundColorScheme: state.settings.backgroundColorScheme,
            particleGroundDensity: state.settings.particleGroundDensity
        }
    };
}

export default connect(mapStateToProps)(RandomImage);
