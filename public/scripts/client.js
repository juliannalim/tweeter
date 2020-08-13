const renderTweets = function (tweets) {
  const sortedTweets = tweets.sort(function (a, b) {
    return a.created_at - b.created_at;
  });
  // loops through tweets
  for (tweet of sortedTweets) {
    // calls createTweetElement for each tweet
    const tempTweet = createTweetElement(tweet);
    $('#tweet-box').prepend(tempTweet);
  }
  // takes return value and appends it to the tweets container
}
// to make sure we don't get hacked, put it on every single thing display data
const escape = function (str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

const createTweetElement = function (tweet) {
  let createdAt = new Date(tweet.created_at);
  let today = Date.now();
  let minutesAgo = Math.round((today - createdAt) / 1000 / 60);
  let daysAgo = Math.round((today - createdAt) / 1000 / 60 / 60 / 24);
  let $tweet =
    `<article class="tweet-box">
      <header>
      <div class='tweet-header'>
          <img src='${escape(tweet.user.avatars)}'>
            <p id='username'>${tweet.user.name}</p>
        </div>
          <p id='userhandle'>${escape(tweet.user.handle)}</p>
      </header>
        <div class='tweet-content'>
          <p>${escape(tweet.content.text)}</p>
        </div>
        <footer class='tweet-footer'>
          <p class='daysAgo'> ${daysAgo < 1 ? minutesAgo + ' minutes' : daysAgo + ' days'} ago</p>
          <div class='icons'>
            <i class="fa fa-flag-o"></i>
            <i class="fa fa-retweet"></i>
            <i class="fa fa-heart-o" style="color:red;"></i>
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

    //form won't submit if it meets these condition 
    if ($('#tweettextID').val().length === 0) {
      // alert('Cannot post an empty tweet!')
      $('#error').text('⚠️Cannot post an empty tweet.⚠️')
      $("#error").slideDown(300);
    } else if ($('#tweettextID').val().length > 140) {
      $('#error').text('⚠️Tweets must be less than 140 characters. You can submit another tweet to complete your woke thoughts!⚠️')
      $("#error").slideDown(300);
    } else {
      $.ajax({
        url: "/tweets",
        method: "POST",
        data: serialized
      }).then((response) => {
        console.log("tweet posted");
        loadTweets();
        $('#error').css('display', 'none');
        // turns the form blank
        $('#tweettextID').val('');
        $('.counter').val('140');
      });
    }
  });
});
