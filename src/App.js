import React, { Component } from 'react';
import './App.css';
import { Rectangle } from 'react-shapes';
import ArtistTest from './Component/info';
import followTxt from './Component/info';
import queryString from 'query-string';
import NavbarFeatures from './Component/Navbar'
import { Button } from 'react-bootstrap'

let defaultStyle = {
  color: '#000'
};


let currentPlaylist = 0;
let playlistNumber = 0;
class Category extends Component {
  render() {
    return (
      <div className="category">

        <h1 style={{ ...defaultStyle, 'font-size': '54px'}}>{this.props.playlist}</h1>
      </div>
    );
  }
};

function testtest(info)
{
  let parsed = queryString.parse(window.location.search);
  let accessToken = parsed.access_token;
  if(!accessToken)
  return;

          fetch(info, {
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
        return item
    })}))
}

class Filter extends Component{
  render() {
    return(
      <div style={defaultStyle}>
      <input type='text' onKeyUp={event =>
      this.props.onTextChange(event.target.value)}/>
      </div>
    );
  }
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
/*
function artistinfo(playlistInfo)
{
  console.log(this.props.data);
  let parsed = queryString.parse(window.location.search);
    let accessToken = parsed.access_token;
    if(!accessToken)
    return;

  let playlistnum = currentPlaylist;
        console.log(playlistInfo)
        let item = uniq_fast(playlistInfo, playlistnum);
        item = noNulls(item,playlistnum);
        let counter = item.length;
        let playlistname = playlistInfo[playlistnum].name;
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
}
*/
class App extends Component {

  constructor() {
    super();
    this.state = { serverData: {} }
  };

  componentDidMount() {
    let parsed = queryString.parse(window.location.search);
    let accessToken = parsed.access_token;
    let allArtist = [];
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
                artists: trackData.artists[0].id,
                number: 0
              }))
          })
          return playlists
        })
        return playlistsPromise
      })
      .then(playlists => {
        let playlistname = '';
        let artistHref = '';
        for(let i = 0; i < playlists.length - 1; i++)
        {
        let playlistnum = i;
        //console.log(playlists)
        let item = uniq_fast(playlists, playlistnum);
        item = noNulls(item,playlistnum);
        let counter = item.length;
        playlistname = playlists[playlistNumber].name;
        if(counter >= 50)
        counter = 50;
        artistHref = 'https://api.spotify.com/v1/artists?ids=' + item[0]
        for(let i = 1; i < counter; i++)
          artistHref +=  "%2C"+item[i]

          allArtist.push(artistHref);
        }

          fetch(allArtist[currentPlaylist], {
      headers:{'Authorization': 'Bearer '+accessToken}
    }).then(response=>response.json())
    .then(data => this.setState({
      Artist: data.artists.sort(function(a, b){
        if(a.followers.total > b.followers.total) return -1;
        if(a.followers.total < b.followers.total) return 1;
        return 0;       
    }).map(item => {
      //console.log(item);
      //console.log(item.name +" == " +item.followers.total+' == '+ counter +' == '+item.images[2].url);
        return{
          name: item.name,
          imageurl: !item.images[2] ? "http://icons-for-free.com/free-icons/png/512/928429.png" : item.images[2].url,
          follow: item.followers.total.toLocaleString(),
          playlistName: playlistname,
          allArtistString: allArtist,
          number: playlists[0].trackDatas[0].number
        }
      })}))
      })
    
      fetch('https://api.spotify.com/v1/me/playlists', {
        headers:{'Authorization': 'Bearer '+accessToken}
      }).then(response=>response.json())
      .then(data => this.setState({
        Playlist: data.items.map(item => {
          return{
            name: item.name,
            imageurl: !item.images[0] ? 'http://simpleicon.com/wp-content/uploads/playlist.png' : item.images[0].url,
            tracktotal: item.tracks.total,
            tittle: 'Playlists'
          }
        })
      }))

      fetch('https://api.spotify.com/v1/browse/new-releases?limit=50', {
        headers:{'Authorization': 'Bearer '+accessToken}
      }).then(response=>response.json())
      .then(data => this.setState({
        Newrelease: data.albums.items.map(item => {
          return{
            name: item.album_type + " - " + item.name,
            imageurl: !item.images[0] ? 'https://www.shareicon.net/download/2015/10/19/658473_music_512x512.png' : item.images[0].url,
            tracktotal: item.total_tracks,
            tittle: 'New Releases'
          }
        })
      }))

      fetch('https://api.spotify.com/v1/browse/featured-playlists', {
        headers:{'Authorization': 'Bearer '+accessToken}
      }).then(response=>response.json())
      .then(data => this.setState({
        Featured: data.playlists.items.map(item => {
          return{
            name: item.name,
            imageurl: !item.images[0] ? 'http://simpleicon.com/wp-content/uploads/playlist.png' : item.images[0].url,
            tracktotal: item.name,
            tittle: data.message
          }
        })
      }))

      console.log(this);

  }
  render() {
    return (
      <div className="App">

        {this.state.Artist ?
        
          <div>
<NavbarFeatures/>
            <Category playlist={this.state.Artist[0].playlistName}/>
              {this.state.Artist.map(info =>
             <ArtistTest test={info} mac={info.name}/>)}
            </div> :<button onClick={()=>{
              window.location='http://localhost:8888/login'}}
            style={{padding: '20px','font-size' : '78px', 'margin-top': '20px'}}>Sign in with Spotify to see Information</button>
            
        }
      </div>
    );
  }
}
export default App;