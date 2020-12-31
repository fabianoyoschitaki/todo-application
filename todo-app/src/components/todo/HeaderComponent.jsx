import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import AuthenticationService from './AuthenticationService.js'

class HeaderComponent extends Component {
    render(){
        const isUserLoggedIn = AuthenticationService.isUserLoggedIn();
        return (
            <header>
                <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                    <div><a href="#" className="navbar-brand">TODO App</a></div>
                    <ul className="navbar-nav">
                        { isUserLoggedIn && <li><Link className="nav-link" to="/welcome/fabiano">Home</Link></li>}
                        { isUserLoggedIn && <li><Link className="nav-link" to="/todos">TODOs</Link></li>}
                    </ul>
                    <ul className="navbar-nav navbar-collapse justify-content-end">
                        { !isUserLoggedIn && <li><Link className="nav-link" to="/login">Login</Link></li>}
                        { isUserLoggedIn && <li><Link className="nav-link" to="/logout" onClick={AuthenticationService.logout}>Logout</Link></li>}
                    </ul>
                </nav>
            </header>
        )
    }
}

// To ensure that header menus are updated whenever the router is called we need to wrap HeaderComponent with a call to withRouter. 
export default withRouter(HeaderComponent)