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

const Style = {
    buttonContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'stretch'
    },
    button: {
        flex: 1
    }
};

const icons = {
    shutdown: <i className="fa fa-power-off"></i>,
    restart: <i className="fa fa-refresh"></i>,
    suspend: <i className="fa fa-power-off fa-rotate-90"></i>,
    hibernate: <i className="fa fa-circle-o-notch"></i>
}

export default class ConfirmWindow extends React.PureComponent {
    constructor(props) {
        super(props);
        console.debug('ConfirmWindow loaded.', this.props);
    }
    handleAction() {
        switch (this.props.params.action) {
            case 'shutdown':
                {
                    lightdm.shutdown();
                    break;
                }
            case 'restart':
                {
                    lightdm.restart();
                    break;
                }
            case 'suspend':
                {
                    lightdm.suspend();
                    break;
                }
            case 'hibernate':
                {
                    lightdm.hibernate();
                    break;
                }
        }
    }
    state = {};
    render() {
        return (
            <Card className="card animated">
                <div className="header">{this.props.params.action}</div>
                <div className="form-container">
                    Are you sure you want to {this.props.params.action}?
                </div>
                <CardActions style={Style.buttonContainer}>
                    <FlatButton style={Style.button} icon={< i className = "fa fa-ban" > </i>} onTouchTap={() => this.props.router.push('/login')} label="Cancel"/>
                    <FlatButton style={Style.button} icon={icons[this.props.params.action]} onTouchTap={this.handleAction.bind(this)} label={this.props.params.action}/>
                </CardActions>
            </Card>
        );
    }
}
