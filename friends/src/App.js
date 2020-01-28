import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';
import FriendsList from './components/FriendsList';

function App() {
  return (
    <Router>
      <div className="App">
          <div>
            <Link to='/login'>Login</Link>
            <Link to='/friends'>Friends</Link>
          </div>
          <Switch>
            <PrivateRoute path='/friends' component={FriendsList} />
              <Route path='/login' component={Login} />
              <Route component={Login} />
          </Switch>
      </div>
    </Router>
  );
}

export default App;
