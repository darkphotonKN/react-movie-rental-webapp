import React, { Component } from 'react';
import './App.css';
import Movies from './components/movies';
import Rental from './components/rental';
import Customers from './components/customers';
import NavBar from './components/navbar';
import NotFound from './components/notFound';
import MovieForm from './components/movieForm';
import LoginForm from './components/loginForm';
import RegisterForm from './components/registerForm';
import { Switch, Route, Redirect } from 'react-router-dom';


class App extends Component {


  render() {
    return (
      <main className="container"> 
        <div className="row">
          <div className="col-7"></div>
          <div className="col">
              <NavBar />
          </div>
        </div>
        <h1 className="display-2 mb-5">Movie Database</h1>

        
        <Switch> 
          <Route path='/register' component={RegisterForm} />
          <Route path='/login' component={LoginForm} />
          <Route path='/movies/:id' component={MovieForm} />
          <Route path='/movies' component={Movies}/>
          <Route path='/not-found' component={NotFound}/>
          <Route path='/rental' component={Rental}/>
          <Route path='/customers' component={Customers}/>
          <Redirect from='/' exact to='/movies' />
          <Redirect to='/not-found' />
        </Switch>
        
      </main>
    );
  }
}

export default App;
