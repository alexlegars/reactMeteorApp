import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Tasks } from '../api/tasks.js';
import Task from './task.js';



// App component - represents the whole app
 class App extends Component {
    renderTasks() {
        return this.props.tasks.map((task) => (
            <Task key={task._id} task={task} />
        ));
    }

     handleSubmit(event) {
         event.preventDefault();

         // Find the text field via the React ref
         const text = this.textInput.value.trim();

         Tasks.insert({
             text,
             createdAt: new Date(), // current time
         });

         // Clear form
         this.textInput.value = '';
     }

    render() {
        return (
            <div className="container">
                <header>
                    <h1>Todo List</h1>
                </header>
                <form className="new-task" onSubmit={this.handleSubmit.bind(this)} >
                    <input
                        type="text"
                        ref={(textInput) => {this.textInput = textInput}}
                        placeholder="Type to add new tasks"
                    />
                </form>

                <ul>
                    {this.renderTasks()}
                </ul>
            </div>
        );
    }
}

export default withTracker(() => {
    return {
        tasks: Tasks.find({}).fetch(),
    };
})(App);