import React from 'react';
const trianglify = require('trianglify');

const Style = {
    position: 'fixed',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width: 100 + 'vw',
    height: 100 + 'vh'
};

export default class Trianglify extends React.PureComponent {
    constructor(props) {
        super(props);
        console.debug('Trianglify loaded.', this.props);
    }
    componentDidMount() {
        this.renderCanvas();
    }
    componentDidUpdate(newProps) {
        this.renderCanvas();
    }
    renderCanvas() {
        let pattern = trianglify({
            cell_size: parseInt(window.innerWidth / 40),
            x_colors: this.props.colors,
            height: window.innerHeight,
            width: window.innerWidth,
            variance: "1"
        });
        pattern.canvas(document.getElementById('trianglify-canvas'));
    }
    state = {}
    render() {
        return (
            <div>
                <canvas style={Style} id="trianglify-canvas"/>
            </div>
        )
    }
}
