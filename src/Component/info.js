import React, { Component } from 'react';
import { Rectangle } from 'react-shapes';

let defaultStyle = {
  color: '#000'
  
};
export default class ArtistTest extends Component {
  render() {
    return (
      <div style={{position: "relative", bottom: "100%", marginTop: "-180px"}}>
        <div className="Rectangles" style={{position: "relative", top: "200px"}}>
        <Rectangle width={'100%'} height={90} fill={{ color: '#333333' }} /></div>
        <div>
          <img src={this.props.test.imageurl} style={{width: '80px',height: '80px',position: "relative", right: "30%", top: "110px"}}/>
          </div>
        <div style={{position: "relative", right: "20%", top: "40px", color: "white"}}>
          <h3>{this.props.test.name} </h3>
        </div>
        <div style={{position: "relative", left: "30%", top: "0%", color: "white"}}>
        <h3>Follows:  {this.props.test.follow} </h3>
          </div>
      </div>
    )
  }
};