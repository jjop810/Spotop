import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

let defaultStyle = {
  color: '#000'
};

class Aggregate extends Component{
  render(){
    return(
      <div className="aggregate">
        <h2 style={{color:'Blue'}}>LogIn First</h2>
      </div>
    );
  }
}

class Artist extends Component{
  render(){
    return(
      <div style={{...defaultStyle, width:"25%"}}>
      <img/>
      <h3>Artist</h3>
      </div>
    )
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
      <h1 style={{...defaultStyle, 'font-size': '54px' }}>Title</h1>
      <Aggregate/>
      <Artist/>
      </div>
    );
  }
}

export default App;
