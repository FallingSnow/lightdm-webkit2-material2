import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Animate from 'rc-animate';

import {IntlProvider, FormattedMessage, addLocaleData} from 'react-intl';

import classNames from "classnames";

import Footer from './Footer.jsx';
import Background from './Background.jsx';

class App extends React.PureComponent {
    constructor(props) {
        super(props);
        console.debug('App loaded.', this.props);
        this.initErrorCatch();
    }
    getLanguageCodeByName(name) {
        for (let language of lightdm.languages) {
            if (language.name === name)
                return language.code;
            }
        return 'en';
    }
    initErrorCatch() {
        window.onerror = this.props.addError;
    }
    render() {
        let languageCode = this.getLanguageCodeByName(this.props.settings.language).substring(0, 5);
        let segment = this.props.location.pathname.split('/')[1] || 'root';

        // LOCALIZATION
        let locale = "",
            messages = [];
        try {
            locale = require('react-intl/locale-data/' + languageCode.substring(0, 2));
            messages = require("../i18n/" + languageCode.substring(0, 2) + ".json");
            addLocaleData([...locale]);
        } catch (e) {
            console.warn('Could not load localization:', e);
        }
        // END LOCALIZATION

        let alignmentClass = 'center';
        if (this.props.settings.alignment === 0)
            alignmentClass = 'left';
        else if (this.props.settings.alignment === 2)
            alignmentClass = 'right'

        let children = React.cloneElement(this.props.children, {key: segment});

        return (
            <IntlProvider locale={languageCode.substring(0, 2)} messages={messages}>
                <div id="app" className={classNames('scaling-' + this.props.settings.scaling * 100, 'locale-' + languageCode.substring(0, 2), 'align-' + alignmentClass)}>
                    <Background {...this.props}/>
                    <Animate transitionEnter={true} component="div" style={{position: 'relative'}} id="transition-container" transitionName={{
                        enter: this.props.settings.animation
                    }} transitionLeave={false}>
                        {children}
                    </Animate>
                    <Footer {...this.props}/>
                </div>
            </IntlProvider>
        );
    }
}

import {changeSetting} from '../actions/settings.js';
import {addError} from '../actions/errors.js';
function mapStateToProps(state) {
    return {settings: state.settings};
}

function mapDispatchToProps(dispatch) {
    return {
        changeSetting: bindActionCreators(changeSetting, dispatch),
        addError: bindActionCreators(addError, dispatch)
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
