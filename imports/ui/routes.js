import React from 'react';
import { Router, Route } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';
// route components
import App from '../ui/App.js';
import LeftMenu from '../ui/components/LeftMenu';
import ClasseDisplay from '../ui/components/ClasseDisplay';
// import ListPageContainer from '../../ui/containers/ListPageContainer.js';
// import AuthPageSignIn from '../../ui/pages/AuthPageSignIn.js';
// import AuthPageJoin from '../../ui/pages/AuthPageJoin.js';
// import NotFoundPage from '../../ui/pages/NotFoundPage.js';
const browserHistory = createBrowserHistory();
export const renderRoutes = () => (
    <Router history={browserHistory}>
        <div className="container">

          <div className="left-menu">
            <LeftMenu />
          </div>

          <div className="top-menu">
            <input type="text" placeholder="Recherchez un étudiant"/>
          </div>

          <div className="centered-container">
            <Route exact path="/" component={App}/>
            <Route path="/classe/:id" component={ClasseDisplay}/>
          </div>
        </div>
    </Router>
);