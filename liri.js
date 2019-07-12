// Read and set environment variables
require("dotenv").config({ path: __dirname + "/.env" });

const keys = require("./keys");
const axios = require("axios");
const Twitter = require("twitter");
const Spotify = require("node-spotify-api");
const request = require("request");
const moment = require("moment");
const fs = require("fs");

const doWhatItSays = () => {
  fs.readFile("random.txt", "utf8", (err, data) => {
    if (err) throw err;

    const dataArr = data.split(",");

    if (dataArr.length === 2) {
      pick(dataArr[0], dataArr[1]);
    } else if (dataArr.length === 1) {
      pick(dataArr[0]);
    }
  });
};

const getMyTweets = () => {
  const client = new Twitter(keys.twitterKeys);

  const params = { screen_name: "Li Bo" };
  client.get("statuses/user_timeline", params, function(
    error,
    tweets,
    response
  ) {
    if (!error) {
      //console.log(tweets);
      for (var i = 0; i < tweets.length; i++) {
        console.log(tweets[i].created_at);
        console.log(tweets[i].text);
        console.log("--------------");
      }
    }
  });
};

const getArtistNames = artist => {
  return artist.name;
};

const getMeSpotify = songName => {
  const spotify = new Spotify(keys.spotify);

  spotify.search({ type: "track", query: songName }, function(err, data) {
    if (err) {
      return console.log("Error occurred: " + err);
    }

    const songs = data.tracks.items;
    for (let i = 0; i < songs.length; i++) {
      console.log(i);
      console.log("Artist(s): " + songs[i].artists.map(getArtistNames));
      console.log("Song name: " + songs[i].name);
      console.log("Preview song: " + songs[i].preview_url);
      console.log("Album: " + songs[i].album.name);
      console.log("----------------------------");
    }
  });
};

const getMovie = movieName => {
  const queryURL =
    "http://omdbapi.com/?t=" +
    movieName +
    "&y=&plot=short&r=json&apikey=trilogy";
  axios.get(queryURL).then(function(response) {
    //console.log(response);
    const jsonData = response.data;
    console.log("-------------------");
    console.log("Title: " + jsonData.Title);
    console.log("Year: " + jsonData.Year);
    console.log("Rating: " + jsonData.Rated);
    console.log("Actors: " + jsonData.Actors);
    console.log("Plot: " + jsonData.Plot);
  });
};

const getArtistEvent = artist => {
  const queryURL =
    "https://rest.bandsintown.com/artists/" +
    artist +
    "/events?app_id=codingbootcamp";
  axios.get(queryURL).then(function(response) {
    for (var i = 0; i < response.data.length; i++) {
      console.log("Venue name: " + response.data[i].venue.name);
      console.log(
        "Venue location: " +
          response.data[i].venue.city +
          ", " +
          response.data[i].venue.region +
          ", " +
          response.data[i].venue.country
      );
      console.log(
        "Venue date: " +
          moment(response.data[i].venue.datetime).format("MM/DD/YYYY")
      );
      console.log("----------");
    }
  });
};

const pick = (caseData, functionData) => {
  switch (caseData) {
    case "my-tweets":
      getMyTweets();
      break;
    case "spotify-this-song":
      getMeSpotify(functionData);
      break;
    case "movie-this":
      getMovie(functionData);
      break;
    case "concert-this":
      getArtistEvent(functionData);
      break;
    case "do-what-it-says":
      doWhatItSays();
      break;
    default:
      console.log("LIRI does not know that!");
  }
};

const runThis = (argOne, argTwo) => {
  pick(argOne, argTwo);
};

// Eliminate need for quotation marks in movie and song choices
const userChoice = process.argv.slice(3).join(" ");
runThis(process.argv[2], userChoice);
