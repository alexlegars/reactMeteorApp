import {Classes} from "../../api/classes.js";
import {Students} from "../../api/students.js";
import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';

class ClassesList extends Component {

  componentDidMount(){
  }

  renderClasses() {
    return this.props.classes.map((entry, key) => (
      <div key={key}>
        <h3 >{entry.name}</h3>
        <table id="list">
          <tbody>
          <tr>
            <th>Étudiant</th>
            {
              entry.exercices &&
              entry.exercices.map((exercice, exKey) => {
                  return (
                    <th key={exKey}>{exercice.name} ({exercice.coefficient})</th>
                  )
                })
            }
          </tr>
          {
            this.props.students.map((student, studentKey) => {
              return (student.classe == entry._id ?
                (<tr key={studentKey}>
                  <td>{student.firstName} {student.lastName}</td>
                  {
                    entry.exercices &&
                      entry.exercices.map((exercice, exKey) => {
                        return (
                          <td key={exKey}>
                            {
                              student.exercices &&
                                student.exercices.map((studentEx, studentExKey) => {
                                  if(studentEx.name === exercice.name){
                                    return (
                                      <span key={studentExKey}>{studentEx.note}</span>
                                    )
                                  }
                                })
                            }
                          </td>
                        )
                      })
                  }
                </tr>)
                : null);
            })
          }
          </tbody>
        </table>
      </div>
      ))
  }



  render() {
    return (
      <div className="container">
        <ul>
          {this.renderClasses()}
        </ul>
      </div>
    );
  }
}

export default withTracker(() => {
  return {
    classes: Classes.find({}).fetch(),
    students: Students.find({}).fetch(),
  };
})(ClassesList);