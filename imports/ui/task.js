import React, { Component } from 'react';
import { Tasks } from '../api/tasks.js';

// Task component - represents a single todo item
export default class Task extends Component {

    toggleChecked() {
        // Set the checked property to the opposite of its current value
        Tasks.update(this.props.task._id, {
            $set: { checked: !this.props.task.checked },
        });
    }

    deleteThisTask() {
        Tasks.remove(this.props.task._id);
    }
    render() {
        return (

            <li>

                {this.props.task.text+' // '+this.props.task.createdAt}
                <button className="delete" onClick={this.deleteThisTask.bind(this)}>
                    &times;
                </button>
                <input
                    type="checkbox"
                    readOnly
                    checked={!!this.props.task.checked}
                    onClick={this.toggleChecked.bind(this)}
                />
                <span>{this.props.task.checked?"check":"pas chake"}</span>
            </li>
        );
    }
}