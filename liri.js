const keys = require("./keys");

const Twitter = require("twitter");

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

const pick = ((caseData, functionData) => {
    switch(caseData) {
        case 'my-tweets' :
            getMyTweets();
            break;
        default: 
            console.log('LIRI does not know that!');
    }
});

const runThis = ((argOne, argTwo) => {
    pick(argOne, argTwo);
});