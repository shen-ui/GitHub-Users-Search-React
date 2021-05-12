import './App.css';
import React, { Component } from 'react';
import UserList from './UserList';
class App extends Component {

  render(){
    return (
      <div className="app">

        <UserList></UserList>
      </div>
    );
  }
  
}

export default App;
