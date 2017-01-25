import React from 'react';
import {createDevTools, persistState} from 'redux-devtools';
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {green100, green500, green700, cyan500} from 'material-ui/styles/colors';
const muiTheme = getMuiTheme({});

import {createHashHistory, useBasename} from 'history';
import {createStore, combineReducers, applyMiddleware, compose, bindActionCreators} from 'redux';
import {Provider, connect} from 'react-redux';
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

function getDebugSessionKey() {
  // You can write custom logic here!
  // By default we try to read the key from ?debug_session=<key> in the address bar
  const matches = window.location.href.match(/[?&]debug_session=([^&#]+)\b/);
  return (matches && matches.length > 0)? matches[1] : null;
}

let enhancer = compose(
  applyMiddleware(middleware)
);

// Setup devtools
let DevTools;
if (process.env.NODE_ENV === 'development') {
    DevTools = createDevTools(
        <DockMonitor toggleVisibilityKey="ctrl-h" changePositionKey="ctrl-q" defaultIsVisible={false}>
            <LogMonitor theme="tomorrow" preserveScrollTop={false}/>
        </DockMonitor>
    );

    enhancer = compose(
      // Middleware you want to use in development:
      applyMiddleware(middleware),
      // Required! Enable Redux DevTools with the monitors you chose
      DevTools.instrument(),
      // Optional. Lets you write ?debug_session=<key> in address bar to persist debug sessions
      persistState(getDebugSessionKey())
    );
}

let store = createStore(reducer, {}, enhancer);

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
