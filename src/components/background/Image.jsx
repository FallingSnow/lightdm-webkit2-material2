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

class Image extends React.Component {
    constructor(props) {
        super(props);
        console.debug('Image loaded.', this.props);
        if (!this.props.path)
            return console.error('Image path not given.');
    }
    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.path !== nextProps.path)
            return true;
        return false;
    }
    render() {
        const computedStyle = Object.assign({}, Style, {
            backgroundImage: 'url(\'file://' + this.props.path + '\'), url(\'' + require('../../static/no-mans-sky.jpg') + '\')'
        });
        return (<div style={computedStyle} id="random-image"/>)
    }
}

export default Image;
