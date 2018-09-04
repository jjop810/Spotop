import React, { Component } from 'react';
import './App.css';
import { Rectangle } from 'react-shapes';
import ArtistTest from './Component/info';
import followTxt from './Component/info';
import queryString from 'query-string';

let defaultStyle = {
  color: '#000'
};

let fakeServerData = {
  TopArtits: {
    Artist: [
      {
        name: 'Ghost',
        followers: '501,378'
      },
      {
        name: 'Avatar',
        followers: '101,885'
      },
      {
        name: 'Alestorm',
        followers: '228,242'
      },
      {
        name: 'Glory Hammer',
        followers: '49,042'
      },

    ]

  }
}

class Category extends Component {
  render() {
    return (
      <div className="category">

        <h1 style={{ ...defaultStyle, 'font-size': '54px' }}>{this.props.temp.genre.toUpperCase()}</h1>
      </div>
    );
  }
};



class CreateRectangle extends Component {
  render() {
    return (
      <div className="Rectangles" style={{position: "relative", top: "25px"}}>
        <Rectangle width={'100%'} height={55} fill={{ color: 'darkred' }} />
      </div>
    );
  }
};



class App extends Component {

  constructor() {
    super();
    this.state = { serverData: {} }
  };



  componentDidMount() {
    let parsed = queryString.parse(window.location.search);
    let accesToken = parsed.access_token;
    if(!accesToken)
    return;

    fetch('https://api.spotify.com/v1/artists/6YIsL2oVmFhVL7EIKwKVQo', {
      headers:{'Authorization': 'Bearer '+accesToken}
    }).then(response=>response.json())
    .then(data => this.setState({
      Artist: {name: data.name, imageurl: data.images[0].url, follow: data.followers.total, genre: data.genres[0]}}))
      
      fetch('https://api.spotify.com/v1/artists/6YIsL2oVmFhVL7EIKwKVQo', {
        headers:{'Authorization': 'Bearer '+accesToken}
      }).then(response=>response.json())
      .then(data => console.log(data.genres[0]))
    
      
  }


  render() {
    let artistData = this.state.Artist ? this.state.Artist.name : [];
    return (
      <div className="App">

        {this.state.Artist ?
          <div>

            <CreateRectangle />
            <Category temp={this.state.Artist}/>
            <ArtistTest test={this.state.Artist}/>
            </div> :<button onClick={()=>window.location='http://localhost:8888/login'}
            style={{padding: '20px','font-size' : '78px', 'margin-top': '20px'}}>Sign in with Spotify to see Information</button>

        }

      </div>
    );
  }
}

export default App;
