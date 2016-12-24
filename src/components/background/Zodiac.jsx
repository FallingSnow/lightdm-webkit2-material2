import React from 'react';
const zodiac = require('../../../node_modules/zodiac/zodiac.js');
const ColorScheme = require('color-scheme');

const Style = {
    position: 'fixed',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width: 100 + 'vw',
    height: 100 + 'vh'
};
const min = 5000, max = 100000;

export default class Zodiac extends React.PureComponent {
    constructor(props) {
        super(props);
        console.debug('Zodiac loaded.', this.props);
    }
    componentDidMount() {
        this.generateColors();
        this.renderCanvas();
    }
    componentDidUpdate(newProps) {
        this.generateColors();
        this.renderCanvas();
    }
    componentWillUnmount() {
        if (this.zd)
            this.zd.destroy();
        }
    generateColors() {
        let scheme = new ColorScheme,
            colors;
        switch (this.props.colors) {
            case 'random':
                const random = Math.floor(Math.random() * (361));
                scheme.from_hue(random).scheme('mono').variation('hard');
                colors = scheme.colors();
                this.dotColor = "#" + colors[0];
                this.lineColor = "#" + colors[1];
                this.bgColor = "#" + colors[2];
                break;
            case 'Blues':
                scheme.from_hue(240).scheme('mono').variation('hard');
                colors = scheme.colors();
                this.dotColor = "#" + colors[0];
                this.lineColor = "#" + colors[1];
                this.bgColor = "#" + colors[2];
                break;
            case 'Purples':
                scheme.from_hue(285).scheme('mono').variation('hard');
                colors = scheme.colors();
                this.dotColor = "#" + colors[0];
                this.lineColor = "#" + colors[1];
                this.bgColor = "#" + colors[2];
                break;
            case 'Oranges':
                scheme.from_hue(45).scheme('mono').variation('hard');
                colors = scheme.colors();
                this.dotColor = "#" + colors[0];
                this.lineColor = "#" + colors[1];
                this.bgColor = "#" + colors[2];
                break;
            case 'Reds':
                scheme.from_hue(0).scheme('mono').variation('hard');
                colors = scheme.colors();
                this.dotColor = "#" + colors[0];
                this.lineColor = "#" + colors[1];
                this.bgColor = "#" + colors[2];
                break;
            case 'YlOrRd':
                colors = scheme.from_hue(60).scheme('mono').variation('hard').colors();
                this.dotColor = "#" + colors[Math.floor(Math.random() * (4))];
                colors = scheme.from_hue(45).scheme('mono').variation('hard').colors();
                this.lineColor = "#" + colors[Math.floor(Math.random() * (4))];
                colors = scheme.from_hue(360).scheme('mono').variation('hard').colors();
                this.bgColor = "#" + colors[Math.floor(Math.random() * (4))];
                break;
            case 'YlGnBu':
                colors = scheme.from_hue(60).scheme('mono').variation('hard').colors();
                this.dotColor = "#" + colors[Math.floor(Math.random() * (4))];
                colors = scheme.from_hue(120).scheme('mono').variation('hard').colors();
                this.lineColor = "#" + colors[Math.floor(Math.random() * (4))];
                colors = scheme.from_hue(240).scheme('mono').variation('hard').colors();
                this.bgColor = "#" + colors[Math.floor(Math.random() * (4))];
                break;
            case 'PuOr':
                colors = scheme.from_hue(45).scheme('mono').variation('hard').colors();
                this.dotColor = "#" + colors[Math.floor(Math.random() * (4))];
                this.lineColor = "#" + colors[Math.floor(Math.random() * (4))];
                colors = scheme.from_hue(285).scheme('mono').variation('hard').colors();
                this.bgColor = "#" + colors[Math.floor(Math.random() * (4))];
                break;
            case 'YlOrBr':
                colors = scheme.from_hue(60).scheme('mono').variation('hard').colors();
                this.dotColor = "#" + colors[Math.floor(Math.random() * (4))];
                colors = scheme.from_hue(45).scheme('mono').variation('hard').colors();
                this.lineColor = "#" + colors[Math.floor(Math.random() * (4))];
                colors = scheme.from_hue(45).scheme('mono').variation('pastel').colors();
                this.bgColor = "#" + colors[Math.floor(Math.random() * (4))];
                break;
        }
    }
    renderCanvas() {
        if (this.zd)
            this.zd.destroy();

        document.getElementById('zodiac').style.backgroundColor = this.bgColor;

        // min <= density <= max
        let density = Math.min(Math.max(min, this.props.density), max);
        let linkDistance = Math.log(this.props.density) * 10;
        this.zd = new zodiac(document.getElementById('zodiac'), {
            dotColor: this.dotColor,
            linkColor: this.lineColor,
            density: this.props.density,
            linkDistance: linkDistance
        });
    }
    render() {
        return (<canvas style={Style} id="zodiac"/>)
    }
}
