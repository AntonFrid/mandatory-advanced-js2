import React from 'react';
import './App.css';
import { Link, Route, BrowserRouter as Router } from 'react-router-dom';
import Main from './components/main.js';
import Add from './components/add.js';
import Edit from  './components/edit.js';
import Details from './components/details.js';

class App extends React.Component {
  render() {
    return (
      <div className='App'>
        <Router>
          <div id='links'>
            <Link to='/'><button>Main</button></Link>
            <Link to='/add'><button>Add</button></Link>
          </div>
          <Route exact path='/' component={ Main }/>
          <Route path='/add' component={ Add }/>
          <Route path='/edit/:id' render={ (props) => <Edit match={props} id={ props.match.params.id }/> }/>
          <Route path='/details/:id' render={ (props) => <Details id={ props.match.params.id }/> }/>
        </Router>
      </div>
    )
  }
}

export default App;
