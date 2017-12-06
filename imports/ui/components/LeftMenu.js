import {Classes} from "../../api/classes.js";
import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom'

class LeftMenu extends Component {

  renderClasses(){
    return this.props.classes.map((entry, key) => (
      <li className="classe-list" key={key}><Link to={"/classe/"+entry._id}>{entry.name}</Link></li>
    ))
  }

  render() {
    return (
      <div className="left-menu-container">
        <ul>
          <li className="dashboard"><Link to="/">Dashboard</Link></li>
          {this.renderClasses()}
        </ul>
      </div>
    );
  }
}

export default withTracker(() => {
  return {
    classes: Classes.find({}).fetch()
  };
})(LeftMenu);