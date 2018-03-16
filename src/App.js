import React, { Component } from 'react';
import ToDo from './components/ToDo.js';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [
        { description: 'Walk the cat', isCompleted: true },
        { description: 'Throw the dishes away', isCompleted: false },
        { description: 'Buy new dishes', isCompleted: false }
      ],
      newTodoDescription: ''
    };
  }

  clearAll() {
    this.setState({ todos: []});
  }

  deleteToDo(index) {
    const todos = this.state.todos;
    todos.splice(index, 1)
    this.setState({ todos: todos });
    // I couldn't figure out how to do this with filter() but I think it would have saved me a couple of lines of code.  Could you please show me how?
  }  

  handleChange(e) {
    this.setState({ newTodoDescription: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (!this.state.newTodoDescription) { return }
    const newTodo = { description: this.state.newTodoDescription, isCompleted: false };
    this.setState({ todos: [...this.state.todos, newTodo], newTodoDescription: '' });
  }

  toggleComplete(index) {
    const todos = this.state.todos.slice();
    const todo = todos[index];
    todo.isCompleted = todo.isCompleted ? false : true;
    this.setState({ todos: todos });
  }

  render() {
    return (
      <div className="App">
        <ul>
          { this.state.todos.map( (todo, index) => 
            <ToDo key={ index } description={ todo.description } isCompleted={ todo.isCompleted } toggleComplete={ () => this.toggleComplete(index) } deleteToDo= { () => this.deleteToDo(index) } />
          )}
        </ul>
        <form onSubmit={ (e) => this.handleSubmit(e) }>
          <input type="text" value={ this.state.newTodoDescription } onChange={ (e) => this.handleChange(e) } />
          <input type="submit" />
          <input type="button" value="Clear all" onClick= { () => this.clearAll()}/>
          {/* because it seemed useful */}
         </form>       
      </div>
    );
  }
}

export default App;
