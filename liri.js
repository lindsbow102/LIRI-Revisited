const keys = require("./keys");
const Twitter = require("twitter");
const Spotify = require("node-spotify-api");
const request = require("request");

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
  request(
    "http://omdbapi.com/?t=" + movieName + "&y=&plot=short&r=json&apikey=trilogy",
    function(error, response, body) {
      console.log("error:", error); // Print the error if one occurred
      console.log("statusCode:", response && response.statusCode); // Print the response status code if a response was received
      const jsonData = JSON.parse(body);
      console.log("-------------------");
      console.log("Title: " + jsonData.Title);
      console.log("Year: " + jsonData.Year);
      console.log("Rating: " + jsonData.Rated);
      console.log("Actors: " + jsonData.Actors);
      console.log("Plot: " + jsonData.Plot);
    }
  );
};

const pick = (caseData, functionData) => {
  switch (caseData) {
    case "my-tweets":
      getMyTweets();
      break;
    case "spotify-this-song":
      getMeSpotify(functionData);
      break;
    case "movie-this" :
        getMovie(functionData);
        break;
    default:
      console.log("LIRI does not know that!");
  }
};

const runThis = (argOne, argTwo) => {
  pick(argOne, argTwo);
};

runThis(process.argv[2], process.argv[3]);
