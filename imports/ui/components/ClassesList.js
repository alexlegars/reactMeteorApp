import {Classes} from "../../api/classes.js";
import {Students} from "../../api/students.js";
import {Exercices} from "../../api/exercices.js";
import {Notes} from "../../api/notes.js";
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
              this.props.exercices &&
              this.props.exercices.map((exercice, exKey) => {
                if(exercice.classe == entry._id){
                  return (
                  <th key={exKey}>{exercice.name} ({exercice.coefficient})</th>
                  )
               }
                })
            }
            <th>Moyenne</th>
          </tr>
          {
            this.props.students.map((student, studentKey) => {
              return (student.classe == entry._id ?
                (<tr key={studentKey}>
                  <td>{student.firstName} {student.lastName}</td>
                  {
                    this.props.exercices &&
                    this.props.exercices.map((exercice, exKey) => {
                      if(exercice.classe == entry._id){
                        return (
                          <td key={exKey}>
                            {
                              this.props.notes &&
                              this.props.notes.map((note, noteKey) => {
                                if(note.exercice == exercice._id && note.student == student._id){
                                  return (<span key={noteKey}>{note.note}</span>)
                                }
                              })
                            }
                          </td>
                        )
                      }
                      })
                  }

                  {
                    this.getStudentMoyenne(student)
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


  getStudentMoyenne(student){
    const notes = Notes.find({student : student._id}).fetch();

    let moyenne = "N/A";
    let coefficient = 0;

    if(notes.length > 0){
      notes.map((note, key) => {
        let exerciceCoefficient = Exercices.findOne({ _id : note.exercice }).coefficient;
        if(key == 0){
          moyenne = parseInt(note.note) * parseInt(exerciceCoefficient);
        }
        else{
          moyenne = parseInt(moyenne) + (parseInt(note.note) * parseInt(exerciceCoefficient));
        }
        coefficient = coefficient + parseInt(exerciceCoefficient);
      })
      moyenne = (moyenne / (coefficient)).toFixed(1);

    }
    return (<td><span>{moyenne}</span></td>)
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
    exercices: Exercices.find({}).fetch(),
    notes: Notes.find({}).fetch(),
  };
})(ClassesList);