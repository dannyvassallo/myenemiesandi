var keepChecking,
twitterHandle;

function getTweets(screenName){
  $.ajax({
    url: 'get_tweets.php',
    data: { screenName: screenName },
    type: 'POST',
    success: function(response) {
      if (typeof response.errors === 'undefined' || response.errors.length < 1) {
        var response = JSON.parse(response);
        $.each(response, function(i, obj) {
          var tweet = obj.text,
          //MAKE t.co LINK FROM TWEETING AND THIS WILL VALIDATE ITS EXISTENCE IN THE USERS LAST TWEET
          checkTerm = "https://t.co/gOZ8S8dDVW";
          console.log(tweet);
          if(tweet.indexOf(checkTerm) > -1){
            // console.log(tweet);
            console.log('TWEET MATCHED');
            clearInterval(keepChecking);
          }
        });
      } else {
        console.log('Something funky happened.');
      }
    },
    error: function(errors) {
      console.log('Twitter Error.');
    }
  });
}


function check_tweets( event ) {
  setTimeout(function(){
    keepChecking = setInterval(function(){
      getTweets(twitterHandle);
    }, 1000);
  }, 100);
}

window.twttr = (function (d,s,id) {
    var t, js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return; js=d.createElement(s); js.id=id;
    js.src="//platform.twitter.com/widgets.js"; fjs.parentNode.insertBefore(js, fjs);
    return window.twttr || (t = { _e: [], ready: function(f){ t._e.push(f) } });
    }(document, "script", "twitter-wjs"));

twttr.ready(function (twttr) {
    twttr.events.bind('tweet', check_tweets);
});

$(function(){
  $('.twitter-share').on('click', function(){
    twitterHandle = $('#twitter-handle').val();
  });
});
