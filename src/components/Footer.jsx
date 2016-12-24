import React from 'react';

import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import Dialog from 'material-ui/Dialog';
import {FormattedMessage} from 'react-intl';

const Style = {
    footer: {
        position: 'fixed',
        left: 0,
        bottom: 0,
        right: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.1)'
    },
    label: {
        fontSize: 12,
        color: 'white'
    }
}

export default class Footer extends React.Component {
    constructor(props) {
        super(props);
        console.debug('Footer loaded.', this.props);
        this.createButtons();
    }
    goTo(destinaton) {
        let _self = this;
        return function() {
            _self.props.router.push(destinaton);
        }
    }
    createButtons() {
            let buttons = [];

            // Add shutdown button if lightdm can shutdown computer
            if (lightdm.can_shutdown) {
                buttons.push(<FlatButton onTouchTap={this.goTo('/confirmation/shutdown')} label={<FormattedMessage id="shutdown" defaultMessage="Shutdown" />} key="shutdown" labelStyle={Style.label} icon={< i style = {
                    Style.label
                }
                className = "fa fa-power-off" > </i>}/>);
            } else {
                console.warn('Shutdown not supported.');
            }

            // Add restart button if lightdm can restart computer
            if (lightdm.can_restart) {
                buttons.push(<FlatButton onTouchTap={this.goTo('/confirmation/restart')} label={<FormattedMessage id="restart" defaultMessage="Restart" />} key="restart" labelStyle={Style.label} icon={< i style = {
                    Style.label
                }
                className = "fa fa-refresh" > </i>}/>);
            } else {
                console.warn('Restart not supported.');
            }

            // Add suspend button if lightdm can suspend computer
            if (lightdm.can_suspend) {
                buttons.push(<FlatButton onTouchTap={this.goTo('/confirmation/suspend')} label={<FormattedMessage id="suspend" defaultMessage="Suspend" />} key="suspend" labelStyle={Style.label} icon={< i style = {
                    Style.label
                }
                className = "fa fa-power-off fa-rotate-90" > </i>}/>);
            } else {
                console.warn('Suspend not supported.');
            }

            // Add hibernate button if lightdm can hibernate computer
            if (lightdm.can_hibernate) {
                buttons.push(<FlatButton onTouchTap={this.goTo('/confirmation/hibernate')} label={<FormattedMessage id="hibernate" defaultMessage="Hibernate" />} key="hibernate" labelStyle={Style.label} icon={< i style = {
                    Style.label
                }
                className = "fa fa-circle-o-notch" > </i>}/>);
            } else {
                console.warn('Hibernate not supported.');
            }

            this.buttons = buttons;
    }
    render() {
        return (
            <footer style={Style.footer} id="footer">
                {this.buttons}
                <FlatButton onTouchTap={this.goTo('/settings')} label={<FormattedMessage id="settings" defaultMessage="Settings" />} labelStyle={Style.label} icon={< i style = {
                    Style.label
                }
                className = "fa fa-gears" > </i>}/>
            <IconButton className="icon" onTouchTap={this.goTo('/about')} style={{float: 'right', height: '100%'}} iconStyle={Style.label} iconClassName="fa fa-question-circle"/>
            </footer>
        );
    }
}
