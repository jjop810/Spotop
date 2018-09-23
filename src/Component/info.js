import React, { Component } from 'react';
import { Rectangle } from 'react-shapes';
import queryString from 'query-string';

let defaultStyle = {
  color: '#000'
  
};
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
function testtest(info)
{
  let parsed = queryString.parse(window.location.search);
  let accessToken = parsed.access_token;
  if(!accessToken)
  return;

          fetch(info, {
      headers:{'Authorization': 'Bearer '+accessToken}
    }).then(response=>response.json())
    .then(data => {console.log(data)})
}


export default class ArtistTest extends Component {
  render() {
    return (
      <div style={{position: "relative", marginTop: "-185px"}}>
        <div className="Rectangles" style={{position: "relative", top: "200px"}}>
        <Rectangle width={'100%'} height={90} fill={{ color: '#333333' }} /></div>
        <div>
          <img src={this.props.test.imageurl} style={{width: '80px',height: '80px',position: "relative", right: "30%", top: "110px"}}/>
          </div>
        <div style={{position: "relative", right: "5%", top: "40px", color: "white"}}>
          <h3>{this.props.test.name} </h3>
        </div>
        <div style={{position: "relative", left: "30%", top: "0%", color: "white"}}>
        <h3>Follows:  {this.props.test.follow} </h3>
          </div>
      </div>
    )
  }
};
