import React from 'react';
import { Router, Route } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';
// route components
import App from '../ui/App.js';
// import ListPageContainer from '../../ui/containers/ListPageContainer.js';
// import AuthPageSignIn from '../../ui/pages/AuthPageSignIn.js';
// import AuthPageJoin from '../../ui/pages/AuthPageJoin.js';
// import NotFoundPage from '../../ui/pages/NotFoundPage.js';
const browserHistory = createBrowserHistory();
export const renderRoutes = () => (
    <Router history={browserHistory}>
        <div>
           <Route exact path="/" component={App}/>
            {/*<Route path="lists/:id" component={ListPageContainer}/>*/}
            {/*<Route path="signin" component={AuthPageSignIn}/>*/}
            {/*<Route path="join" component={AuthPageJoin}/>*/}
            {/*<Route path="*" component={NotFoundPage}/>*/}
        </div>
    </Router>
);