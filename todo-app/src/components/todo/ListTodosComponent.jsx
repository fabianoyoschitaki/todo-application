import React, { Component } from "react";
import TodoDataService from "../../api/todo/TodoDataService.js";
import AuthenticationService from "./AuthenticationService.js";
import moment from "moment";

class ListTodosComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      message: null,
    };
    this.updateTodoClicked = this.updateTodoClicked.bind(this);
    this.addTodoClicked = this.addTodoClicked.bind(this);
    this.deleteTodoClicked = this.deleteTodoClicked.bind(this);
    this.refreshTodos = this.refreshTodos.bind(this);
  }

  // the best practice suggested in React is, when you're calling an API,
  // it's better not to do the initial API call directly in the constructor.
  // What happens? The state will not be initialized until the API call is completed, and that
  // is not a good state to be. What we can do is initially we can set it to some empty state (todos: []).
  // once the compomnent is rendered, we make the call to the API. Once the data appear, the component will be rendered.
  componentDidMount() {
    this.refreshTodos();
  }

  refreshTodos() {
    let username = AuthenticationService.getLoggedInUsername();
    TodoDataService.retrieveAllTodos(username).then((response) => {
      this.setState({
        todos: response.data,
      });
    });
  }

  componentWillUnmount() {
    console.log("componentWillUnmount");
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log("shouldComponentUpdate");
    console.log(nextProps);
    console.log(nextState);
    return true; // if false then the TODO list will never get updated
  }

  deleteTodoClicked(id) {
    let username = AuthenticationService.getLoggedInUsername();
    console.log(`Deleting Todo ${id} for username ${username}`);
    TodoDataService.deleteTodo(username, id).then((response) => {
      this.setState({ message: `Delete of todo ${id} successful!` });
      // refresh todos so the deleted one does not appear anyumore
      this.refreshTodos();
    });
  }

  // Redirect to TodoComponent when update button is clicked
  updateTodoClicked(id) {
    console.log(`Update Todo with id ${id}`)
    this.props.history.push(`/todos/${id}`);
  }

  // Reusing same TodoComponent, but with ID -1 for which backend will understand it's a new TODO
  addTodoClicked() {
    console.log('Create new Todo')
    this.props.history.push(`/todos/-1`);
  }

  render() {
    return (
      <div>
        <h1>List Todos</h1>

        {/* Only shows message when this.state.message is not null */}
        {this.state.message && (
          <div className="alert alert-success">{this.state.message}</div>
        )}

        <div className="container">
          <table className="table">
            <thead>
              <tr>
                <th>Description</th>
                <th>Target Date</th>
                <th>Is it Done?</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {this.state.todos.map((todo) => (
                <tr key={todo.id}>
                  <td>{todo.description}</td>
                  <td>{moment(todo.targetDate).format("YYYY-MM-DD")}</td>
                  <td>{todo.done.toString()}</td>
                  <td>
                    <button
                      onClick={() => this.updateTodoClicked(todo.id)}
                      className="btn btn-success"
                    >
                      Update
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => this.deleteTodoClicked(todo.id)}
                      className="btn btn-warning"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="row">
                <button className="btn btn-success" onClick={this.addTodoClicked}>Add</button>
          </div>
        </div>
      </div>
    );
  }
}

export default ListTodosComponent;
