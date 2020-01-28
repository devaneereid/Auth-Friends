import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';
import FriendsList from './components/FriendsList';
import styled from 'styled-components';

const Div = styled.div`
  display: flex;
  justify-content: space-evenly;
  font-family: monospace;
`;

function App() {
  return (
    <Router>
      <div className="App">
          <Div> 
            <Link to='/login'>Login</Link> 
              < br/>
            <Link to='/friends'>Friends</Link>
          </Div>
          <Switch>
            <PrivateRoute exact path='/friends' component={FriendsList} />
              <Route path='/login' component={Login} />
              <Route component={FriendsList} />
              <Route component={Login} />
          </Switch>
      </div>
    </Router>
  );
};
export default App;
