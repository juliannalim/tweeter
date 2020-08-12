/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// const data = [
//   {
//     "user": {
//       "name": "Newton",
//       "avatars": "https://i.imgur.com/73hZDYK.png"
//       ,
//       "handle": "@SirIsaac"
//     },
//     "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//     "created_at": 1461116232227
//   },
//   {
//     "user": {
//       "name": "Descartes",
//       "avatars": "https://i.imgur.com/nlhLi3I.png",
//       "handle": "@rd"
//     },
//     "content": {
//       "text": "Je pense , donc je suis"
//     },
//     "created_at": 1461113959088
//   }
// ]

const renderTweets = function (tweets) {
  // loops through tweets
  for (tweet of tweets) {
    // calls createTweetElement for each tweet
    let tempTweet = createTweetElement(tweet);
    $('.container').append(tempTweet);
  }
  // takes return value and appends it to the tweets container
}

const createTweetElement = function (tweet) {
  let createdAt = new Date(tweet.created_at);
  let today = Date.now();
  let daysAgo = Math.round((today - createdAt) / 1000 / 60 / 60 / 24);
  console.log(daysAgo);
  let $tweet =
    `<article class="tweet-box">
      <header>
      <div class='tweet-header'>
          <img src='${tweet.user.avatars}'>
            <p id='username'>${tweet.user.name}</p>
        </div>
          <p id='userhandle'>${tweet.user.handle}</p>
      </header>
        <div class='tweet-content'>
          <p>${tweet.content.text}</p>
        </div>
        <footer class='tweet-footer'>
          <p class='daysAgo'> ${daysAgo} days ago</p>
          <div class='icons'>
            <i class="fa fa-flag-o"></i>
            <i class="fa fa-retweet"></i>
            <i class="fa fa-heart-o"></i>
          </div>
        </footer>
    </article>`
  return $tweet;
}

//create an AJAX get the tweets
$(document).ready(function () {
  const loadTweets = function () {
    //gets json from /tweets
    $.ajax({
      url: "/tweets",
      method: "GET"
    }).then((response) => {
      //empty tweet container section since renderTweets appends all of the tweets in our array
      $('#tweet-box').empty();
      renderTweets(response);
    });
  };

  // Post request//

  //load all our tweets upon loading page
  loadTweets();
  //each time we submit form (click tweet)
  $('form').submit(function (event) {
    //cancels original functionality since we want to add our own
    event.preventDefault();
    //encode a set of form elements as a string for submission.
    const serialized = $(this).serialize();

    $.ajax({
      url: "/tweets",
      method: "POST",
      data: serialized
    }).then((response) => {
      console.log("tweet posted");
      loadTweets();
      // turns the form blank
      $('#tweettextID').val('');
    });
  });
});
