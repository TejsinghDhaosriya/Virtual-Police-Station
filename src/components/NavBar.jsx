import React, {Component} from "react";
import "bootstrap/js/src/collapse.js";
import {NavLink} from "react-router-dom";

class NavBar extends Component{

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <a className="navbar-brand" href="#">Virtual Police</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false"
                        aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <NavLink exact activeClassName="active" to="/">
                        <a className="nav-item nav-link" href="/">Home <span className="sr-only">(current)</span></a></NavLink>
                        <NavLink exact activeClassName="active" to="/profile"><a className="nav-item nav-link" href="/profile">My Profile</a></NavLink>
                        <NavLink exact activeClassName="active" to="/about"><a className="nav-item nav-link" href="/about">About Us</a></NavLink>
                        <NavLink exact activeClassName="active" to="/contact"><a className="nav-item nav-link" href="/contact">Contact Us</a></NavLink>
                    </div>
                </div>
            </nav>
        );
    }
}

export default NavBar;