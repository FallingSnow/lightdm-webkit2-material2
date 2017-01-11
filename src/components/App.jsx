import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import {IntlProvider, FormattedMessage, addLocaleData} from 'react-intl';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {green100, green500, green700, cyan500} from 'material-ui/styles/colors';

import classNames from "classnames";

import Footer from './Footer.jsx';
import Background from './Background.jsx';

const muiTheme = getMuiTheme({});

class App extends React.PureComponent {
    constructor(props) {
        super(props);
        console.debug('App loaded.', this.props);
    }
    getLanguageCodeByName(name) {
        for (let language of lightdm.languages) {
            if (language.name === name)
                return language.code;
            }
        return 'en';
    }
    render() {
        let languageCode = this.getLanguageCodeByName(this.props.settings.language).substring(0, 5);
        let segment = this.props.location.pathname.split('/')[1] || 'root';

        // LOCALIZATION
        let locale = require('react-intl/locale-data/' + languageCode.substring(0, 2));
        let messages = require("../i18n/" + languageCode.substring(0, 2) + ".json");
        addLocaleData([...locale]);
        // END LOCALIZATION

        let alignmentClass = 'center';
        if (this.props.settings.alignment === 0)
            alignmentClass = 'left';
        else if (this.props.settings.alignment === 2)
            alignmentClass = 'right'

        return (
            <IntlProvider locale={languageCode.substring(0, 2)} messages={messages}>
                <div id="app" className={classNames('scaling-' + this.props.settings.scaling * 100, 'locale-' + languageCode.substring(0, 2), 'align-' + alignmentClass)}>
                    <Background {...this.props}/>
                    <ReactCSSTransitionGroup id="transition-container" transitionName={{
                        enter: this.props.settings.animation
                    }} transitionEnterTimeout={1000} transitionEnter={true} transitionLeave={false}>
                        {React.cloneElement(this.props.children, {key: segment})}
                    </ReactCSSTransitionGroup>
                    <Footer {...this.props}/>
                </div>
            </IntlProvider>
        );
    }
}

import {changeSetting} from '../actions/settings.js';
function mapStateToProps(state) {
    return {settings: state.settings};
}

function mapDispatchToProps(dispatch) {
    return {
        changeSetting: bindActionCreators(changeSetting, dispatch)
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
