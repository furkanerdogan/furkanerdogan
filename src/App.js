import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

/* Component */

/* Page */
import Home from './page/Home';
import NoMatch from './page/NoMatch';

import Detail from './page/Detail';
import AdminAddProduct from './page/AdminAddProduct';
import Login from './page/Login';
/* route */
import PrivateRoute from './route/Private'
import PublicRoute from './route/Public'

import { AuthProvider } from "./Provider/AuthProvider";

/* css */
import './App.css';


function App() {

  return (
    <AuthProvider>
      <div className="App container">
        <Router>
          <Switch>
            <PublicRoute restricted={false} path="/" exact >
              <Home />
            </PublicRoute>
            <PublicRoute restricted={true} path="/login" component={Login} exact />
            <PrivateRoute path="/AdminAddProduct" component={AdminAddProduct} exact />
            <Route exact path="/:detailId"   >
              <Detail />
            </Route>

            <Route path="*">
              <NoMatch />
            </Route>

          </Switch>
        </Router>

      </div>
    </AuthProvider>
  );
}

export default App;
