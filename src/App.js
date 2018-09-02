import React, { Component } from 'react';
import './App.css';
import { Rectangle } from 'react-shapes';
import ArtistTest from './Component/info';
import followTxt from './Component/info';

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

        <h1 style={{ ...defaultStyle, 'font-size': '54px' }}>Title</h1>
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
  }


  render() {
    return (
      <div className="App">

        {this.state.serverData.TopArtits ?
          <div>

            <CreateRectangle />
            <Category />
            {this.state.serverData.TopArtits.Artist.map(artist =>
              <ArtistTest test={artist} />
            )}
            </div> :<button onClick={()=>window.location='http://localhost:8888/login'}
            style={{padding: '20px','font-size' : '78px', 'margin-top': '20px'}}>Sign in with Spotify to see Information</button>

        }

      </div>
    );
  }
}

export default App;
