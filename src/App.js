import React, { Component } from 'react';
import './App.css';
import { Rectangle } from 'react-shapes';
import ArtistTest from './Component/info';
import followTxt from './Component/info';
import queryString from 'query-string';

let defaultStyle = {
  color: '#000'
};


class Category extends Component {
  render() {
    return (
      <div className="category">

        <h1 style={{ ...defaultStyle, 'font-size': '54px'}}>Jose Juan</h1>
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
    let accessToken = parsed.access_token;
    if(!accessToken)
    return;

    fetch('https://api.spotify.com/v1/artists?ids=2R21vXR83lH98kGeO99Y66%2C6YIsL2oVmFhVL7EIKwKVQo%2C4q3ewBCX7sLwd24euuV69X%2C4SsVbpTthjScTS7U2hmr1X%2C4VMYDCV2IEDYJArk749S6m%2C5bWUlnPx9OYKsLiUJrhCA1', {
      headers:{'Authorization': 'Bearer '+accessToken}
    }).then(response=>response.json())
    .then(data => this.setState({
      Artist: data.artists.sort(function(a, b){
        if(a.followers.total > b.followers.total) return -1;
        if(a.followers.total < b.followers.total) return 1;
        return 0;
    }).map(item => {
        return{
          name: item.name,
          imageurl: item.images[2].url,
          follow: item.followers.total.toLocaleString()
        }
      })}))
      
      //this is a temp test function
      fetch('https://api.spotify.com/v1/artists?ids=2R21vXR83lH98kGeO99Y66%2C6YIsL2oVmFhVL7EIKwKVQo%2C4q3ewBCX7sLwd24euuV69X%2C4SsVbpTthjScTS7U2hmr1X', {
        headers:{'Authorization': 'Bearer '+accessToken}
      }).then(response=>response.json())
      .then(data => console.log(data.artists[2]))
      

      fetch('https://api.spotify.com/v1/me/playlists', {
      headers: {'Authorization': 'Bearer ' + accessToken}
    }).then(response => response.json())
    .then(playlistData => {
      let playlists = playlistData.items
      let trackDataPromises = playlists.map(playlist => {
        let responsePromise = fetch(playlist.tracks.href, {
          headers: {'Authorization': 'Bearer ' + accessToken}
        })
        let trackDataPromise = responsePromise
          .then(response => response.json())
        return trackDataPromise
      })
      let allTracksDataPromises = 
        Promise.all(trackDataPromises)
      let playlistsPromise = allTracksDataPromises.then(trackDatas => {
        trackDatas.forEach((trackData, i) => {
          playlists[i].trackDatas = trackData.items
            .map(item => item.track)
            .map(trackData => ({
              name: trackData.name,
              artists: trackData.artists[0].id
            }))
        })
        return playlists
      })
      return playlistsPromise
    })
    .then(playlists => this.setState({
      playlists: playlists.map(item => {
        return {
          name: item.name,
          imageUrl: item.images[0].url, 
          songs: item.trackDatas
        }
    })
    }))

  }

  render() {
    return (
      <div className="App">

        {this.state.Artist ?
        
          <div>

            <CreateRectangle />

            <Category/>

            {this.state.Artist.map(info =>
             <ArtistTest test={info}/>)}
            </div> :<button onClick={()=>window.location='http://localhost:8888/login'}
            style={{padding: '20px','font-size' : '78px', 'margin-top': '20px'}}>Sign in with Spotify to see Information</button>
        }
      </div>
    );
  }
}
export default App;
