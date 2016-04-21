var keepChecking,
twitterHandle,
// spaces are plus signs
tweetText = 'SHARE+"TOXIC"+TO+WIN+INSTRUMENTS+USED+IN+THE+MUSIC+VIDEO',
//this is validated
//MAKE t.co LINK FROM TWEETING AND THIS WILL VALIDATE ITS EXISTENCE IN THE USERS LAST TWEET
tweetUrl = "https://t.co/E3B3jC2u4l";

function getTweets(screenNameInput){
  $.ajax({
    url: 'get_tweets.php',
    data: { screenName: screenNameInput },
    type: 'POST',
    dataType: 'json',
    success: function(response) {
      if (typeof response.errors === 'undefined' || response.errors.length < 1) {
        // var response = JSON.parse(response);
        $.each(response, function(i, obj) {
          var tweet = obj.text,
          checkTerm = tweetUrl;
          console.log(tweet);
          if(tweet.indexOf(checkTerm) > -1){
            // console.log(tweet);
            console.log('TWEET MATCHED');
            clearInterval(keepChecking);
            $('#hidden-email-input').val($('#twitter-email').val());
            $('#twitter-share-input').val('true');
            Materialize.toast('Thanks for your entry!', 5000, 'green darken-4');
            setTimeout(function(){
                $('#submission-form').submit();
            }, 500);
            setTimeout(function(){
                $('#submission-form').trigger('reset');
                $('#twitter-handle').val('');
                $('#twitter-email').val('');
            }, 1000);
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
  }, 500);
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
  $('.twitter-share').attr('href', "https://twitter.com/intent/tweet?url="+tweetUrl+"&text="+tweetText);
  $('.twitter-share').on('click', function(){
    if($('#twitter-handle').val().length > 0){
      twitterHandle = $('#twitter-handle').val().replace('@', '');
    } else {
      Materialize.toast('You must provide your twitter screenname.', 5000, 'red darken-4');
      return false;
    }
    if(validateEmail($('#twitter-email').val())){
      return true;
    } else {
      Materialize.toast('You must provide your email address.', 5000, 'red darken-4');
      return false;
    }
  });
});
