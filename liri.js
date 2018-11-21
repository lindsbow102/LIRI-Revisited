const keys = require("./keys");
const Twitter = require("twitter");
var Spotify = require("node-spotify-api");

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

const getArtistNames = ((artist) => {
    return artist.name;
});

const getMeSpotify = songName => {
  const spotify = new Spotify(keys.spotify);

  spotify.search({ type: "track", query: songName }, function(
    err,
    data
  ) {
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

const pick = (caseData, functionData) => {
  switch (caseData) {
    case "my-tweets":
      getMyTweets();
      break;
    case "spotify-this-song" :
        getMeSpotify(functionData);
        break;
    default:
      console.log("LIRI does not know that!");
  }
};

const runThis = (argOne, argTwo) => {
  pick(argOne, argTwo);
};

runThis(process.argv[2], process.argv[3]);
