import React, {Component} from 'react';
import {Classes} from "../api/classes.js";
import {Exercices} from "../api/exercices.js";
import {Notes} from "../api/notes.js";
import {Students} from "../api/students.js";
import {withTracker} from 'meteor/react-meteor-data';
import ClassesList from './components/ClassesList';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      classes: [],
      autocompleteValue: ""
    }
  }

  insertStudent(e) {
    e.preventDefault();
    Students.insert({
      firstName: this.studentFirstName.value,
      lastName: this.studentLastName.value,
      classe: this.studentClasse.value
    })
    this.studentFirstName.value = "";
    this.studentLastName.value = "";
  }

  insertClasse(e) {
    e.preventDefault();
    Classes.insert({
      name: this.classeName.value,
      createdAt: new Date()
    })
    this.classeName.value = "";
  }

  addExercice(e) {
    e.preventDefault();

    Exercices.insert({
      name: this.exerciceName.value,
      classe: this.exerciceClasse.value,
      coefficient: this.exerciceCoefficient.value
    })


    this.exerciceName.value = "";
    this.exerciceCoefficient.value = "";
  }

  renderClassesOptions() {
    return this.props.classes.map((entry, key) => (
      <option key={key} value={entry._id}>{entry.name}</option>
    ))
  }

  renderStudentsOptions() {
    return this.props.students.map((entry, key) => (
      <option key={key} value={entry._id}>{entry.firstName} {entry.lastName}</option>
    ))
  }

  renderStudentExercicesOptions() {
    if (this.state.classes.length > 0) {


      let student = Students.findOne({
        _id: this.noteStudent.value
      });

      if(student){
        const exercices  = Exercices.find({ classe : student.classe }).fetch();

        if(exercices){
          return exercices.map((exercice, key) => (
            <option key={key} value={exercice._id}>{exercice.name}</option>
          ));
        }
      }
    }
    if(this.props.studentNames){
      console.log(this.props.studentNames)
    }
  }

  updateClasses(){
    this.setState({
      classes : this.props.classes
    })
  }

  addNote(e) {
    e.preventDefault();

    const studentID = this.noteStudent.value;

    const exerciceID = Exercices.findOne({_id : exerciceID});

    const existingNote = Notes.findOne({student : studentID, exercice : exerciceID});

    if(existingNote){
      Notes.update(
        {_id : existingNote._id},
        {
          note: this.noteValue.value
      })
    }else{
      Notes.insert({
        student: studentID,
        exercice: this.noteExercice.value,
        note: this.noteValue.value
      })
    }

    this.noteValue.value = "";
  }

  getStudentsNames(){
    let names = [];
    this.props.students.map((student) => {
      names.push(student.firstName+" "+student.lastName);
    })
    return names;
  }

  render() {

    const studentsNames = this.getStudentsNames();

    console.log(studentsNames);

    return (
      <div className="container">

        <div className="left-menu">

        </div>

        <div className="top-menu">
          <input type="text" placeholder="Recherchez un étudiant"/>
        </div>

        <div className="centered-container">
          <ClassesList/>

          <div className="custom-block">
            <div className="head-block">
              <h2>Ajouter une classe</h2>
            </div>
            <div className="block-container">
              <form className="new-classe" onSubmit={this.insertClasse.bind(this)}>
                <input type="text" placeholder="Nom de la classe" ref={(name) => {
                  this.classeName = name
                }}/>
                <button>Envoyer</button>
              </form>
            </div>
          </div>


          <div className="custom-block">
            <div className="head-block">
              <h2>Ajouter un élève</h2>
            </div>
            <div className="block-container">
              <form className="new-student" onSubmit={this.insertStudent.bind(this)}>
                <input type="text" placeholder="Prénom" ref={(firstName) => {
                  this.studentFirstName = firstName
                }}/>
                <input type="text" placeholder="Nom" ref={(lastName) => {
                  this.studentLastName = lastName
                }}/>
                <select name="student-class-select" ref={(classe) => {
                  this.studentClasse = classe
                }} id="">
                  {this.renderClassesOptions()}
                </select>
                <button>Envoyer</button>
              </form>
            </div>
          </div>

          <div className="custom-block">
            <div className="head-block">
              <h2>Ajouter un exercice</h2>
            </div>
            <div className="block-container">
              <form className="new-exercice" onSubmit={this.addExercice.bind(this)}>
                <input type="text" placeholder="Nom de l'exercice" ref={(name) => {
                  this.exerciceName = name
                }}/>
                <input type="text" placeholder="Coefficient" ref={(coefficient) => {
                  this.exerciceCoefficient = coefficient
                }}/>
                <select name="exercice-class-select" ref={(classe) => {
                  this.exerciceClasse = classe
                }} id="">
                  {this.renderClassesOptions()}
                </select>
                <button>Envoyer</button>
              </form>
            </div>
          </div>

          <div className="custom-block">
            <div className="head-block">
              <h2>Ajouter une note</h2>
            </div>
            <div className="block-container">
              <form className="new-note" onSubmit={this.addNote.bind(this)}>
                <select name="note-exercice-select" ref={(student) => {
                  this.noteStudent = student
                }} id="" onChange={() => this.updateClasses()}>
                  <option role="placeholder" value="">Sélectionnez un élève</option>
                  {this.renderStudentsOptions()}
                </select>
                <select name="note-exercice-select" ref={(exercice) => {
                  this.noteExercice = exercice
                }} id="">
                  <option role="placeholder" value="">Sélectionnez un exercice</option>
                  {this.renderStudentExercicesOptions()}
                </select>
                <input type="text" placeholder="Note" ref={(note) => {
                  this.noteValue = note
                }}/>
                <button>Envoyer</button>
              </form>
            </div>
          </div>
        </div>
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
})(App);