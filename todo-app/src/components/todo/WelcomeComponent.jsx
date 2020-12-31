import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import HelloWorldService from '../../api/todo/HelloWorldService.js'

class WelcomeComponent extends Component {

    constructor(props){
        super(props)
        this.retrieveWelcomeMessage = this.retrieveWelcomeMessage.bind(this)
        this.handleSuccessfulResponse = this.handleSuccessfulResponse.bind(this)
        this.handleError = this.handleError.bind(this)
        this.state = {
            welcomeMessage: ''
        }
    }

    // Use Link instead of <a> so that the page does not get refreshed
    render(){
        return (
            <div>
                <h1>Welcome!</h1>
                <div className="container">
                    Welcome {this.props.match.params.name}! You can manage your TODOs by clicking <Link to="/todos">here</Link>.
                </div>
                {/* 
                <div className="container">
                    Click here to get a customized welcome message.
                    <button className="btn btn-success" onClick={this.retrieveWelcomeMessage}>Get welcome message</button>
                </div>
                */}
                <div className="container">
                    {this.state.welcomeMessage}
                </div>
            </div>
        )
    }

    retrieveWelcomeMessage(){
        // HelloWorldService.executeHelloWorldService()
        // HelloWorldService.executeHelloWorldBeanService()
        HelloWorldService.executeHelloWorldPathService(this.props.match.params.name) // comes from <AuthenticatedRoute path="/welcome/:name" component={WelcomeComponent}/>
        .then(response => this.handleSuccessfulResponse(response))
        .catch(error => this.handleError(error))
    }

    handleSuccessfulResponse(response){
        console.log(`Success response: ${response}`)
        console.log(response)
        this.setState({
            welcomeMessage: response.data.message
        })
    }

    handleError(error){
        console.log(`Error response: ${error}`)
        let errorMessage = ''

        // no response at all
        if (error.message)
            errorMessage += error.message

        // at least an error response
        if (error.response && error.response.data)
            errorMessage += error.response.data.message

        this.setState({
            welcomeMessage: errorMessage
        })
    }
}

export default WelcomeComponent