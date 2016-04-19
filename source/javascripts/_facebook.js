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
        alert('Thanks for your entry!');
        setTimeout(function(){
            $('#submission-form').submit();
        }, 100);
        setTimeout(function(){
            $('#submission-form').trigger('reset');
            $('#facebook-email').val('');
        }, 300);
      } else {
        alert('You must publish the share to enter.');
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
      alert('Your must enter your email.');
    }
  });
});
