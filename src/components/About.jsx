import React from 'react';
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
const PackageConfig = require('../../package.json');

export default class About extends React.PureComponent {
    constructor(props) {
        super(props);
        console.debug('About loaded.', this.props);
    }
    state = {};
    render() {
        return (
            <Card className="card animated">
                <div className="header"><FormattedMessage id="about" defaultMessage="About"/></div>
                <div className="form-container">
                    <h4 style={{
                        margin: 0
                    }}><FormattedMessage id="foundABug" defaultMessage="I found a bug, where can I report it?"/></h4>
                    <br/>
                    <small>
                        <i>https://github.com/FallingSnow/lightdm-webkit-material/issues</i>
                    </small>
                    <br/><br/>
                    <h4 style={{
                        margin: 0
                    }}><FormattedMessage id="settingAProfileIcon" defaultMessage="Setting a profile icon"/></h4>
                    <br/>
                    <small><FormattedMessage id="seeForMoreInfo" defaultMessage="See {link} for more info." values={{
                link: <i key="link" style={{
                        wordBreak: 'break-all'
                    }}>https://github.com/Antergos/lightdm-webkit2-greeter/tree/master/themes/antergos#user-icons-management</i>
            }}/></small>
                    <br/><br/>
                    <section style={{
                        textAlign: 'center'
                    }}>
                    <small>Crafted with &nbsp;<i className="fa fa-heart"></i>&nbsp; in the USA.</small>
                        <br/>
                            <small style={{fontSize: '0.6em', color: 'grey'}}><FormattedMessage id="version" defaultMessage="Version {version}" values={{
                    version: PackageConfig.version
                }}/></small>
        </section>
                </div>https://github.com/Antergos/lightdm-webkit2-greeter/tree/master/themes/antergos#user-icons-management
                <CardActions>
                    <FlatButton style={{
                        width: 100 + '%'
                    }} icon={< i className = "fa fa-undo" > </i>} onTouchTap={() => this.props.router.push('/login')} label={< FormattedMessage id = "back" defaultMessage = "Back" />}/>
                </CardActions>
            </Card>
        );
    }
}
