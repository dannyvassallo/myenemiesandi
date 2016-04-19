function fb_share() {
  FB.ui(
    {
      method: 'feed',
      name: 'Facebook Dialogs',
      link: 'https://developers.facebook.com/docs/dialogs/',
      picture: 'http://fbrell.com/f8.jpg',
      caption: 'Reference Documentation',
      description: 'Dialogs provide a simple, consistent interface for applications to interface with users.'
    },
    function(response) {
      if (response && response.post_id) {
        Materialize.toast('Thanks for your entry!', 5000, 'green darken-4');
        setTimeout(function(){
            $('#submission-form').submit();
        }, 100);
        setTimeout(function(){
            $('#submission-form').trigger('reset');
            $('#facebook-email').val('');
        }, 300);
      } else {
        Materialize.toast('You must publish the share to enter.', 5000, 'red darken-4');
      }
    }
  );
}

$(document).ready(function(){
  $('.fb-share-btn').on( 'click', function(){
    if(validateEmail($('#facebook-email').val())){
      $('#hidden-email-input').val($('#facebook-email').val());
      $('#facebook-share-input').val('TRUE');
      fb_share();
    } else {
      Materialize.toast('Your must enter your email.', 5000, 'red darken-4');
    }
  });
});
