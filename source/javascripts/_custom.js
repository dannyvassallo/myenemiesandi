// ADD YOUR JS HERE

//REGEX VALIDATE EMAILS
function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}


// resize album cta
function resizeAlbumCta(){
  if($(window).width() <= 600){
    newH = ($('.avail').height() + $('.itunes').height() + 50);
    $('.album-cta').height(newH);
  } else {
    $('.album-cta').height($('.album').height());
  }
}

$(function(){
  resizeAlbumCta();
});

$(window).resize(function(){
  resizeAlbumCta();
});
