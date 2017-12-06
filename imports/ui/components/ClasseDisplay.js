import React, {Component} from 'react';
import {Classes} from "../../api/classes.js";
import {Exercices} from "../../api/exercices.js";
import {Notes} from "../../api/notes.js";
import {Students} from "../../api/students.js";
import {withTracker} from 'meteor/react-meteor-data';

class ClasseDisplay extends Component {

  constructor(props) {
    super(props);

    this.state = {

    }
  }

  getClasse(){
    return Classes.findOne({ _id : this.props.match.params.id});
  }

  getClasseName(){
    if(this.getClasse()){
      return (<span>{this.getClasse().name}</span>);
    }
  }

  getStudentsList(){
      if(this.props.studentList){
       return this.props.studentList.map((student, key) => (<li key={key}>{student.firstName + " " + student.lastName}</li>))
      }
  }

  getExercicesList(){
    if(this.props.exercicesList){
      return this.props.exercicesList.map((exercice, key) => (<li key={key}>{exercice.name + " (" + exercice.coefficient +")"}</li>))
    }
  }

  render() {
    const className = this.getClasseName();
    const classeStudents = this.getStudentsList();
    const classeExercices = this.getExercicesList();
    return (
      <div className="classe-display">
        <div className="custom-block">
          <div className="head-block">
            Liste des élèves de la {
              className
            }
          </div>
          <div className="block-container">
            <ul>
              {classeStudents}
            </ul>
          </div>
        </div>
        {
          (this.props.exercicesList && this.props.exercicesList.length > 0) &&
          <div className="custom-block">
            <div className="head-block">
              Liste des exercices de la  {
              className
            }
            </div>
            <div className="block-container">
              <ul>
                {classeExercices}
              </ul>
            </div>
          </div>
        }
      </div>
    );
  }
}

export default withTracker((props) => {
  return {
    classes: Classes.find({}).fetch(),
    students: Students.find({}).fetch(),
    exercices: Exercices.find({}).fetch(),
    studentList: Students.find({ classe : props.match.params.id }).fetch(),
    exercicesList: Exercices.find({ classe : props.match.params.id }).fetch()
  };
})(ClasseDisplay);