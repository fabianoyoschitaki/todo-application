import React, { Component } from 'react'
import moment from 'moment'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import TodoDataService from '../../api/todo/TodoDataService.js'
import AuthenticationService from './AuthenticationService.js'

class TodoComponent extends Component{
    constructor(props){
        super(props)
        
        this.state = {
            id: this.props.match.params.id,
            description: '',
            targetDate: moment(new Date()).format('YYYY-MM-DD')
        }

        this.onSubmit = this.onSubmit.bind(this)
        this.validateForm = this.validateForm.bind(this)

        console.log(this.state)
    }

    componentDidMount(){
        // only call Todo details if it's to update an existing Todo. Otherwise (id === -1), we leave all blank and don't change state
        if (this.state.id === -1)
            return

        let username = AuthenticationService.getLoggedInUsername()
        TodoDataService.retrieveTodo(username, this.state.id)
            .then(response => this.setState({
                description: response.data.description,
                targetDate: moment(response.data.targetDate).format('YYYY-MM-DD')
            }))
        // we need to reinitialize on Formik so that these new values take place
        // enableReinitialize={true}
    }

    // Update or create TODO (depends on id === -1 for new todo or != -1 for update existing todo)
    onSubmit(values){
        let username = AuthenticationService.getLoggedInUsername()
        let todo = {
            id: this.state.id,
            description: values.description, 
            targetDate: values.targetDate
        }

        if (this.state.id === -1){
            // Creating Todo!
            TodoDataService.createTodo(username, todo).then(() => this.props.history.push(`/todos`))
        } else {
            //Updating Todo!
            TodoDataService.updateTodo(username, this.state.id, todo).then(() => this.props.history.push(`/todos`))
        }
    }

    // if errors is not empty, submit in the form does not happen
    // Formik by default enables validation onBlur and onChange. Let's disable them and only use this onSubmit
    validateForm(values){
        let errors = {}
        if (!values.description) {
            errors.description = 'Enter a description'
        } else if (values.description.length < 5){
            errors.description = 'Enter at least 5 characters for description'
        }

        if (!moment(values.targetDate).isValid()) {
            errors.targetDate = 'Enter a valid target date'
        }

        return errors
    }
    
    render(){
        // how to initialize values inside the form?
        // let descriptionVar = this.state.description
        // let targetDateVar = this.state.targetDate
        let { description, targetDate } = this.state

        return (
            <div>
                <h1>Todo</h1>
                <div className="container">
                    <Formik 
                        initialValues={{description, targetDate}}
                        onSubmit={this.onSubmit}
                        validateOnChange={false}
                        validateOnBlur={false}
                        validate={this.validateForm}
                        enableReinitialize={true}
                        >
                        {
                            (props) => (
                                <Form>
                                    <ErrorMessage name="description" component="div" className="alert alert-warning"/>
                                    <ErrorMessage name="targetDate" component="div" className="alert alert-warning"/>

                                    <fieldset className="form-group">
                                        <label>Description</label>
                                        <Field className="form-control" type="text" name="description" placeholder="Describe your TODO here"/>
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Target Date</label>
                                        <Field className="form-control" type="date" name="targetDate"/>
                                    </fieldset>
                                    <button className="btn btn-success" type="submit">Save</button>
                                </Form>
                            )
                        }
                    </Formik>
                </div>
            </div>
        )
    }
}

export default TodoComponent