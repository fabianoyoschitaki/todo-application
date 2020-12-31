import React, { Component } from 'react'
import AuthenticationService from './AuthenticationService.js'

class LoginComponent extends Component {
    constructor(props){
        super(props)
        this.state = {
            username: 'fabiano', 
            password: '',
            hasLoginFailed: false,
            showSuccessMessage: false
        }
        this.handleChange = this.handleChange.bind(this)
        this.loginClicked = this.loginClicked.bind(this)
    }

    handleChange(event){
        console.log(`Changing state ${event.target.name} to ${event.target.value}`)
        this.setState({ [event.target.name] : event.target.value})
    }

    loginClicked(){

        /* THIS PIECE OF CODE WAS REPLACED BY AuthenticationService.executeBasicAuthenticationService
        console.log(this.state)
        if (this.state.username === 'fabiano' && this.state.password === '123'){
            console.log('Login Successful!');
            // Adds to session storage
            AuthenticationService.registerSuccessfulLoginForBasicAuth(this.state.username, this.state.password)

            // Redirect to Welcome page. Don't need to set state anymore
            this.props.history.push(`/welcome/${this.state.username}`) 
            // this.setState({ showSuccessMessage : true })
            // this.setState({ hasLoginFailed : false })
        } else {
            console.log('Login Failed!');
            this.setState({ showSuccessMessage : false })
            this.setState({ hasLoginFailed : true })
        }
        */

        /* REPLACED BY JWT 
        AuthenticationService.executeBasicAuthenticationService(this.state.username, this.state.password)
        .then(() => {
            console.log('Login Successful!');
            // Adds to session storage
            AuthenticationService.registerSuccessfulLoginForBasicAuth(this.state.username, this.state.password)
            // Redirect to Welcome page. Don't need to set state anymore
            this.props.history.push(`/welcome/${this.state.username}`) 
        }).catch(() => {
            console.log('Login Failed!');
            this.setState({ showSuccessMessage : false })
            this.setState({ hasLoginFailed : true })
        })
        */

       AuthenticationService.executeJwtAuthenticationService(this.state.username, this.state.password)
       .then((response) => {
           console.log('JWT Login Successful!');
           // Adds to session storage
           AuthenticationService.registerSuccessfulLoginForJwt(this.state.username, response.data.token) // comes from BE payload
           // Redirect to Welcome page. Don't need to set state anymore
           this.props.history.push(`/welcome/${this.state.username}`) 
       }).catch(() => {
           console.log('Login Failed!');
           this.setState({ showSuccessMessage : false })
           this.setState({ hasLoginFailed : true })
       })
    }

    render(){
        return (
            // div because with JSX we cannot return multiple elements back
            <div>
                <h1>Login</h1>
                <div className="container">
                    {/*<ShowInvalidCredentials hasLoginFailed={this.state.hasLoginFailed}/>*/}
                    { this.state.hasLoginFailed && <div className="alert alert-warning">Invalid Credentials</div>}
                    
                    {/*<ShowLoginSuccessMessage showSuccessMessage={this.state.showSuccessMessage}/>*/}
                    { this.state.showSuccessMessage && <div>Login Successful</div>}

                    Username: <input type="text" name="username" value={this.state.username} onChange={this.handleChange}/>
                    Password: <input type="password" name="password" value={this.state.password} onChange={this.handleChange}/>
                    <button className="btn btn-success" onClick={this.loginClicked}>Login</button>
                </div>
            </div>
        )
    }
}

export default LoginComponent