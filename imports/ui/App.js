import React, {Component} from 'react';
import {Classes} from "../api/classes.js";
import {Students} from "../api/students.js";
import {withTracker} from 'meteor/react-meteor-data';
import ClassesList from './components/ClassesList';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      classes: []
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

    const classeExercices = Classes.find({_id: this.exerciceClasse.value}).exercices;

    console.log(classeExercices);
    let exercices = [];

    if (classeExercices) {
      exercices = classeExercices
    }

    let newExercice = {
      name: this.exerciceName.value,
      coefficient: this.exerciceCoefficient.value
    };

    exercices.push(newExercice);

    Classes.update(this.exerciceClasse.value, {
      $set: {
        exercices
      }
    })
  }

  renderClassesOptions() {
    return this.props.classes.map((entry, key) => (
      <option key={key} value={entry._id}>{entry.name}</option>
    ))
  }

  renderStudentsOptions() {
    return this.props.students.map((entry, key) => (
      <option key={key} value={entry.classe}>{entry.firstName} {entry.lastName}</option>
    ))
  }

  renderStudentExercicesOptions() {
    if (this.state.classes.length > 0) {
      let studentClasse = Classes.findOne({
        _id: this.noteStudent.value
      });
      if (studentClasse) {
        return studentClasse.exercices.map((exercice, key) => (
            <option key={key} value={exercice.name}>{exercice.name}</option>
          )
        )
      }
    }
  }

  updateClasses(){
    this.setState({
      classes : this.props.classes
    })
  }

  addNote(e) {
    e.preventDefault();

    const userExercices = Students.find({_id: this.noteStudent.value}).exercices;

    let exercices = [];

    if (userExercices) {
      exercices = userExercices
    }

    let newExercice = {
      name: this.noteExercice.value,
      note: this.noteValue.value
    };

    exercices.push(newExercice);

    Students.update(this.noteStudent.value, {
      $set: {
        exercices
      }
    })
  }

  render() {
    return (
      <div className="container">
        <header>
          <h1>Liste des classes</h1>
        </header>
        <ClassesList/>

        <h2>Ajouter un élève</h2>
        <form className="new-student" onSubmit={this.insertStudent.bind(this)}>
          <input type="text" ref={(firstName) => {
            this.studentFirstName = firstName
          }}/>
          <input type="text" ref={(lastName) => {
            this.studentLastName = lastName
          }}/>
          <select name="student-class-select" ref={(classe) => {
            this.studentClasse = classe
          }} id="">
            {this.renderClassesOptions()}
          </select>
          <button>Envoyer</button>
        </form>

        <h2>Ajouter une classe</h2>
        <form className="new-classe" onSubmit={this.insertClasse.bind(this)}>
          <input type="text" ref={(name) => {
            this.classeName = name
          }}/>
          <button>Envoyer</button>
        </form>

        <h2>Ajouter un exercice</h2>
        <form className="new-exercice" onSubmit={this.addExercice.bind(this)}>
          <input type="text" ref={(name) => {
            this.exerciceName = name
          }}/>
          <input type="text" ref={(coefficient) => {
            this.exerciceCoefficient = coefficient
          }}/>
          <select name="exercice-class-select" ref={(classe) => {
            this.exerciceClasse = classe
          }} id="">
            {this.renderClassesOptions()}
          </select>
          <button>Envoyer</button>
        </form>

        <h2>Ajouter une note</h2>
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
            {this.renderStudentExercicesOptions()}
          </select>
          <input type="text" placeholder="Note" ref={(note) => {
            this.noteValue = note
          }}/>
          <button>Envoyer</button>
        </form>
      </div>
    );
  }
}

export default withTracker(() => {
  return {
    classes: Classes.find({}).fetch(),
    students: Students.find({}).fetch(),
  };
})(App);