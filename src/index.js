import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';
import 'jquery/dist/jquery.min';
import Profile from "./components/Profile";
import ContactUs from "./components/ContactUs";
import {Route, Link, BrowserRouter as Router, Switch} from 'react-router-dom'
import NavBar from "./components/NavBar";
import * as serviceWorker from './serviceWorker';
import NotFound from "./components/NotFound";
import AboutUs from "./components/AboutUs";

const routing = (
    <Router>
        <NavBar/>
        <div>
            <Switch>
            <Route exact path="/" component={App}/>
            <Route path="/profile" component={Profile}/>
            <Route path="/about" component={AboutUs}/>
            <Route path="/contact" component={ContactUs}/>
            <Route component={NotFound}/>
            </Switch>
        </div>
    </Router>
)

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
