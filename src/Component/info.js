import React, { Component } from 'react';

let defaultStyle = {
  color: '#000'
};

export default class ArtistTest extends Component {
  render() {
    return (
      <div>
        <div>
          <img src={this.props.test.imageurl} style={{width: '150px',position: "relative", right: "30%", top: "80px"}}/>
          </div>
        <div style={{position: "relative", right: "15%", top: "40px"}}>
          <h3>{this.props.test.name} </h3>
        </div>
        <div style={{position: "relative", left: "30%", top: "0%"}}>
        <h3>Follows:  {this.props.test.follow} </h3>
          </div>
      </div>
    )
  }
};