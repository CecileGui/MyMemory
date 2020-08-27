import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Card from'./Card'

class App extends Component {
  render(){
    return(
      
      <div className="memory">
        <h1>Memory</h1>
        <div className="board">
          <Card/>
          <Card/>
          <Card/>
          <Card/>
          <Card/>
          <Card/>
          <Card/>
          <Card/>
          <Card/>
          <Card/>
          <Card/>
          <Card/>
        </div>
          
          
      </div>
    )
    
  }
}

export default App;
