import React from 'react';
import {createDevTools} from 'redux-devtools';
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {green100, green500, green700, cyan500} from 'material-ui/styles/colors';
const muiTheme = getMuiTheme({});

import {createHashHistory, useBasename} from 'history';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import {Router, Route, IndexRedirect} from 'react-router';
import {routerMiddleware, syncHistoryWithStore, routerReducer} from 'react-router-redux';
import * as reducers from '../reducers';
const reducer = combineReducers({
    ...reducers,
    routing: routerReducer
});

// History v3
// const initializedHistory = useBasename(createHashHistory)({
//     basename: window.location.pathname.substr(0, window.location.pathname.lastIndexOf('/'))
// });
// History v4
const initializedHistory = createHashHistory({
    basename: window.location.pathname.substr(0, window.location.pathname.lastIndexOf('/'))
});

// HACK to use history v4 with react-router v3
initializedHistory.getCurrentLocation = () => (initializedHistory.location);
// END HACK

const middleware = routerMiddleware(initializedHistory);

let store = createStore(reducer, applyMiddleware(middleware));
let DevTools,
    stats;
if (process.env.NODE_ENV === 'development') {
    DevTools = createDevTools(
        <DockMonitor toggleVisibilityKey="ctrl-h" changePositionKey="ctrl-q">
            <LogMonitor theme="tomorrow" preserveScrollTop={false}/>
        </DockMonitor>
    );
    store = createStore(reducer, DevTools.instrument(), applyMiddleware(middleware));
}

const history = syncHistoryWithStore(initializedHistory, store);

import App from './App.jsx';
import Login from './Login.jsx';
import Settings from './Settings.jsx';
import About from './About.jsx';
import NotFound from './NotFound.jsx';
import confirmationWindow from './confirmWindow.jsx';

export default class Main extends React.PureComponent {
    constructor(props) {
        super(props);
        console.debug('Main loaded.', this.props);
    }
    devtools() {
        if (process.env.NODE_ENV === 'development')
            return <DevTools/>;
        else
            return null;
        }
    render() {
        return (
            <Provider store={store}>
                <div>
                    <MuiThemeProvider muiTheme={muiTheme}>
                        <Router history={history}>
                            <Route path="/" component={App}>
                                <IndexRedirect to="login"/>
                                <Route path="login" component={Login}/>
                                <Route path="settings" component={Settings}/>
                                <Route path="about" component={About}/>
                                <Route path="confirmation/:action" component={confirmationWindow}/>
                            </Route>
                            <Route path='*' component={NotFound}/>
                        </Router>
                    </MuiThemeProvider>
                    {this.devtools()}
                </div>
            </Provider>
        );
    }
}
