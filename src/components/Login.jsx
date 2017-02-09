/** GLOBAL lightdm */
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
import {FormattedMessage} from 'react-intl';
import {orange500} from 'material-ui/styles/colors';
import capsLock from 'capslock';

let users = [],
    sessions = [];
for (let userIndex in lightdm.users) {
    let userSuffix = '';
    if (lightdm.users[userIndex].logged_in)
        userSuffix = <span className="user-suffix">(Logged In)</span>
    let text = <span>{lightdm.users[userIndex].username} {userSuffix}</span>

    users.push(<MenuItem value={lightdm.users[userIndex].username} key={userIndex} primaryText={text}/>);
}
for (let sessionIndex in lightdm.sessions) {
    let session = lightdm.sessions[sessionIndex];
    sessions.push(<MenuItem value={session.key} key={sessionIndex} primaryText={session.name} title={session.comment}/>);
}

class Login extends React.Component {
    constructor(props) {
        super(props);
        console.debug('Login loaded.', this.props);
        window.authentication_complete = this.authentication_complete.bind(this);
        window.show_prompt = this.show_prompt.bind(this);
        window.show_message = this.show_message.bind(this);
    }
    changeUserName = (event, index, selectedUserName) => {
        this.props.changeSetting('userName', index, selectedUserName);
        if (this.getUserByName(selectedUserName).session)
            this.changesessionKey(null, null, this.getUserByName(selectedUserName).session);
        console.debug('Changed user to', selectedUserName || index);
    }
    changesessionKey = (event, index, sessionKey) => {
        this.props.changeSetting('sessionKey', index, sessionKey);
        console.debug('Changed session to', sessionKey);
    }
    passwordWarningStyle = {
        color: orange500,
        borderColor: orange500
    }
    updatePassword = (event) => {

        // Show warning if capslock is enabled
        if (capsLock.status) {
            this.setState({password: event.target.value, passwordError: 'Capslock is on.', passwordStyle: this.passwordWarningStyle});
        } else {
            this.setState({password: event.target.value, passwordError: '', passwordStyle: {}});
        }
    }
    login(e) {
        e.preventDefault();
        lightdm.cancel_autologin();

        if (lightdm.in_authentication)
            lightdm.cancel_authentication();
        this.setState({authenticating: lightdm.in_authentication});

        console.debug('Authenticating:', lightdm.in_authentication);
        lightdm.authenticate(this.props.settings.userName);
    }
    defaultAvatar() {
        this.setState({avatarSrc: require('../static/avatar.png')});
    }
    getUserByName(name) {
        for (let user of lightdm.users) {
            if (user.name === name)
                return user;
            }
        return false;
    }
    getSessionByName(name) {
        for (let session of lightdm.sessions) {
            if (session.name === name)
                return session;
            }
        return false;
    }
    show_prompt(text, type) {
        console.debug('GREETER:show_prompt', type, text);
        if (type === 'password') {
            console.debug('Responding with password.');
            lightdm.respond(this.state.password || '');
        }
    }
    show_message(text, type) {
        console.debug('GREETER:show_message', type, text);
    }
    authentication_complete() {
        this.setState({authenticating: lightdm.in_authentication});
        if (lightdm.is_authenticated) {
            document.getElementById('wrapper').className = "fade-out";
            let _self = this;
            setTimeout(function() {
                lightdm.login(lightdm.authentication_user, _self.props.settings.sessionKey);
            }, 1000);
            return;
        } else {
            this.setState({password: '', passwordError: <FormattedMessage id="incorrectPassword" defaultMessage="Incorrect password"/>});
            return document.getElementById('password-input').focus();
        }
    }
    componentWillMount() {
        // If user exists in lightdm then set avatar to user's image, otherwise
        // display default avatar
        let user = this.getUserByName(this.props.settings.userName);
        if (user) {
            this.setState({
                avatarSrc: 'file:///' + user.image
            });
        } else {
            this.defaultAvatar();
        }
    }
    render() {
        let loginBtnStatus = {
            iconClass: 'fa-sign-in',
            label: <FormattedMessage id="signIn" defaultMessage="sign in"/>
        };
        if (this.state.authenticating) {
            loginBtnStatus = {
                iconClass: 'fa-sign-in animated infinite flash',
                label: <FormattedMessage id="signingIn" defaultMessage="signing in"/>
            };
        }

        // Default: allow users to select from a list of users
        let userSelect = <SelectField fullWidth={true} floatingLabelText={< FormattedMessage id = "user" defaultMessage = "User" />} value={this.props.settings.userName} onChange={this.changeUserName}>
            {users}
        </SelectField>;
        // Require users to input their username
        if (lightdm.hide_users) {
            userSelect = <TextField fullWidth={true} floatingLabelText={< FormattedMessage id = "user" defaultMessage = "User" />} value={this.props.settings.userName} onChange={this.changeUserName} autoFocus={lightdm.hide_users}/>
        }
        return (
            <Card className="card animated">
                <form onSubmit={this.login.bind(this)} id="login-form">
                    <div className="header"><FormattedMessage id="welcomeBack" defaultMessage="Weclome Back"/>!</div>
                    <div id="avatarContainer">
                        <img className="avatar" src={this.state.avatarSrc} onError={this.defaultAvatar.bind(this)}/>
                    </div>
                    <div className="form-container">
                        {userSelect}
                        <TextField id="password-input" floatingLabelStyle={this.state.passwordStyle} errorStyle={this.state.passwordStyle} underlineStyle={this.state.passwordStyle} fullWidth={true} floatingLabelText={< FormattedMessage id = "password" defaultMessage = "Password" />} type="password" value={this.state.password || ''} onChange={this.updatePassword} autoFocus={!lightdm.hide_users} errorText={this.state.passwordError} hintText={this.state.passwordHint}/>
                        <SelectField fullWidth={true} floatingLabelText={< FormattedMessage id = "session" defaultMessage = "Session" />} value={this.props.settings.sessionKey} onChange={this.changesessionKey}>
                            {sessions}
                        </SelectField>
                    </div>
                    <CardActions>
                        <FlatButton icon={< i className = {
                            'fa ' + loginBtnStatus.iconClass
                        } > </i>} style={{
                            width: 100 + '%'
                        }} label={loginBtnStatus.label} disabled={this.state.authenticating} onTouchTap={this.login.bind(this)}/>
                    </CardActions>
                </form>
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
        changeSetting: bindActionCreators(changeSetting, dispatch)
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);
