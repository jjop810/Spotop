import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

let defaultTextColor = '#000'
let defaultStyle = {
  color: defaultTextColor
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
    let name = 'mamao';
    let green = '#FF1212'
    let headerStyle = {color: green, 'font-size': '50px'};
    return (
      <div className="App">
      <h1>Title</h1>
      <Aggregate/>
      <Artist/>
      </div>
    );
  }
}

export default App;
