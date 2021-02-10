const express = require('express');
const axios = require('axios');
const cors = require('cors');
const morgan = require('morgan')
const app = express();
app.use(cors());
app.use(morgan('dev'));

// // init Spotify API wrapper
// var SpotifyWebApi = require('spotify-web-api-node');

// // Set up credentials
// var spotifyApi = new SpotifyWebApi({
//   clientId :  'fd5003bed14d4a21bb7ecd48ac3a69f7',
//   clientSecret : '8e6e8f55cdb442b6a34086c52994c5fb',
// });

// // Apply credentials using client grant
// spotifyApi.clientCredentialsGrant()
//   .then(function(data) {
//     // Save the access token so that it's used in future calls
//     spotifyApi.setAccessToken(data.body['access_token']);
//   }, function(err) {
//     console.log('Something went wrong when retrieving an access token', err.message);
//   });

// // Retrieve an access token.
// function getToken() {
//     spotifyApi.clientCredentialsGrant().then(
//         function (data) {
//             console.log('The access token expires in ' + data.body['expires_in']);
//             console.log('The access token is ' + data.body['access_token']);
//             spotifyApi.setAccessToken(data.body['access_token']);
//         },
//         function (err) {
//             console.log('Something went wrong when retrieving an access token', err);
//         }
//     );
// }
// // Used to re-retrieve an access token every hour
// setInterval(getToken, 1000 * 60 * 60);

app.get('/releases', function(request, response) {

      spotifyApi.getNewReleases(query, {limit: 5})
      .then(function(data) {
        response.send(data.body)
      }, function(err) {
        console.log(err)
      })
})

// Searches for artists
// @returns first 10 artists
// @param: the user inputted text
// app.get('/artists', function(request, response) {
//     let query = request.query.query + "*";
    
//     setTimeout(function(){
//       spotifyApi.searchArtists(query, {limit: 10})
//       .then(function(data) {
//         response.send(data.body);
//       }, function(err) {
//         console.log(err)
//       }); 
//     }, 100);
//   });
  
//   // Retrieves an artist's albums
//   // @returns [album objects]
//   // @param: the id of the artist
//   app.get('/artistAlbums', function(request, response) {
//     let artist = request.query.artist;
    
//     setTimeout(function(){
//       spotifyApi.getArtistAlbums(artist, {market: 'US'})
//       .then(function(data) {
//         console.log(data.body);
//         response.send(data.body);
//       }, function(err) {
//         console.log(err)
//       });
//     }, 100);
//   });
  
//   // Retrieves the album artwork from an album ID
//   // @return: data about the album
//   // @param: the ID of the album clicked
//   app.get('/albumArtwork', function(request, response) {
//     let albumId = request.query.albumId;
//     spotifyApi.getAlbum(albumId)
//     .then(function(data) {
//       response.send(data.body);
//     }, function(err) {
//       console.log(err)
//     });
//   });




// Listen on port ???
app.listen(3000, () =>{
    console.log('server started on port 3000');
});
