import React from 'react';
import classNames from 'classnames';
import moment from 'moment';

import {
    Card,
    CardActions,
    CardHeader,
    CardMedia,
    CardTitle,
    CardText
} from 'material-ui/Card';

class Error extends React.PureComponent {
    constructor(props) {
        super(props);
    }
    state = {};
    toggleExpand() {
        this.setState({
            expanded: !this.state.expanded
        });
    }
    render() {
        const err = this.props.error;
        const stack = this.state.expanded
            ? <pre className="dev-console-message-error-stack">{err.error.stack}</pre>
            : null;
        return (
            <CardText className={classNames("dev-console-message expandable", {expanded: this.state.expanded})}>
                <div className="dev-console-message-title" onTouchTap={this.toggleExpand.bind(this)}><i className="fa fa-exclamation"/> <span className="dev-console-message-timestamp">{moment().format('HH:mm:ss.SS')} |</span> {err.msg}</div>
                {stack}
            </CardText>
        );
    }
}

export default class Console extends React.PureComponent {
    constructor(props) {
        super(props);
        console.debug('Console loaded.', this.props);
    }
    state = {};
    render() {
        let messages = [],
            i = 0;
        for (let m of this.props.messages) {
            if (m.type === 'error')
                messages.push(<Error error={m} key={i++}/>)
        }
        return (
            <Card id={this.props.id} style={{
                display: this.props.show
                    ? 'flex'
                    : 'none'
            }} className="card dev-console">
                <div className="dev-console-title header">Console</div>
                <div className="dev-console-inner-container">
                    {messages}
                </div>
            </Card>
        );
    }
}
