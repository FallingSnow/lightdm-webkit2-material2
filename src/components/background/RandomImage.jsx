import React from 'react';
import Image from './Image.jsx';

class RandomImage extends React.Component {
    constructor(props) {
        super(props);
        console.debug('RandomImage loaded.', this.props);
        if (!this.props.directory)
            return console.error('Images directory prop not given.');

        this.imagePaths = greeterutil.dirimages(this.props.directory);
        if (typeof this.imagePaths === 'undefined')
            this.imagePaths = [''];
        }
    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.backgroundImagesDirectory !== nextProps.backgroundImagesDirectory)
            return true;
        return false;
    }
    getRandomPath() {
        let imageIndex = Math.floor(Math.random() * this.imagePaths.length);
        return this.imagePaths[imageIndex];
    }
    render() {
        return (<Image path={this.getRandomPath()} />);
    }
}

export default RandomImage;
