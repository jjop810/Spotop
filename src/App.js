import React, { Component } from 'react';
import './App.css';
import { Rectangle } from 'react-shapes';
import ArtistTest from './Component/info';
import followTxt from './Component/info';
import queryString from 'query-string';

let defaultStyle = {
  color: '#000'
};


let currentPlaylist = 3;


class Category extends Component {
  render() {
    return (
      <div className="category">

        <h1 style={{ ...defaultStyle, 'font-size': '54px'}}>{this.props.playlist}</h1>
      </div>
    );
  }
};

function artistinfo()
{
  let parsed = queryString.parse(window.location.search);
  let accesToken = parsed.access_token;

  fetch('https://api.spotify.com/v1/artists/6YIsL2oVmFhVL7EIKwKVQo', {
    headers:{'Authorization': 'Bearer '+accesToken}
  }).then(response=>response.json())
  .then(data => console.log(data.genres[0]))
}

class CreateRectangle extends Component {
  render() {
    return (
      <div className="Rectangles" style={{position: "relative", top: "25px"}}>
        <Rectangle width={'100%'} height={55} fill={{ color: 'darkred' }} />
      </div>
    );
  }
};

function uniq_fast(a, playlist) {
  let out = [];
  for(let i = 0; i < a[playlist].trackDatas.length; i++) {
       out.push(a[playlist].trackDatas[i].artists);
  }
  let unique = [...new Set(out)];
  return unique;
}

function noNulls(arr, playlist){
  let temp = [];

  for(let i of arr)
  i && temp.push(i)

arr = temp;
return arr;
}

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
      .then(playlists => {
        let playlistnum = currentPlaylist;
        console.log(playlists)
        let item = uniq_fast(playlists, playlistnum);
        item = noNulls(item,playlistnum);
        let counter = item.length;
        let playlistname = playlists[playlistnum].name;
        if(counter >= 50)
        counter = 50;
        let artistHref = 'https://api.spotify.com/v1/artists?ids=' + item[0]
        for(let i = 1; i < counter; i++)
          artistHref +=  "%2C"+item[i]
          fetch(artistHref, {
      headers:{'Authorization': 'Bearer '+accessToken}
    }).then(response=>response.json())
    .then(data => this.setState({
      Artist: data.artists.sort(function(a, b){
        if(a.followers.total > b.followers.total) return -1;
        if(a.followers.total < b.followers.total) return 1;
        return 0;
        
    }).map(item => {
      console.log(item);
      //console.log(item.name +" == " +item.followers.total+' == '+ counter +' == '+item.images[2].url);
        return{
          name: item.name,
          imageurl: !item.images[2] ? "http://icons-for-free.com/free-icons/png/512/928429.png" : item.images[2].url,
          follow: item.followers.total.toLocaleString(),
          playlistName: playlistname
        }
      })}))
      })
    
    
  }
  render() {
    return (
      <div className="App">

        {this.state.Artist ?
        
          <div>
            <button onClick={()=> {
            currentPlaylist = currentPlaylist + 1;
            console.log(currentPlaylist);}}
            style={{padding: '20px','font-size' : '78px', 'margin-top': '20px'}}>Change Playlist</button>
            <CreateRectangle />
             <Category playlist={this.state.Artist[0].playlistName}/>
 
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
