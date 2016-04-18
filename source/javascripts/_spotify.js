// ARTIST ID
var artistId = "0TQX3oIwJihCIx1fNCeNcF";

(function() {

    function login(callback) {
        var CLIENT_ID = 'b78f0b3542b24da9a437ff78735eb9db';
        var REDIRECT_URI = siteUrl+'spotify/callback';
        function getLoginURL(scopes) {
            return 'https://accounts.spotify.com/authorize?client_id=' + CLIENT_ID +
              '&redirect_uri=' + encodeURIComponent(REDIRECT_URI) +
              '&scope=' + encodeURIComponent(scopes.join(' ')) +
              '&response_type=token';
        }

        var url = getLoginURL([
            'user-follow-modify'
        ]);

        var width = 450,
            height = 730,
            left = (screen.width / 2) - (width / 2),
            top = (screen.height / 2) - (height / 2);

        window.addEventListener("message", function(event) {
            var hash = JSON.parse(event.data);
            if (hash.type == 'access_token') {
                callback(hash.access_token);
            }
        }, false);

        var w = window.open(url,
                            'Spotify',
                            'menubar=no,location=no,resizable=no,scrollbars=no,status=no, width=' + width + ', height=' + height + ', top=' + top + ', left=' + left
                           );

    }

    function followArtist(accessToken, artistId) {
        $.ajax({
            url: 'https://api.spotify.com/v1/me/following?type=artist&ids='+artistId,
            headers: {
               'Authorization': 'Bearer ' + accessToken
            },
            method: 'PUT',
            success: function() {
                followButton.textContent = 'Following';
                alert('followed');
            },
            dataType: 'html',
            error: function(e) {
                console.error(e);
            }
        });
    }

    var followButton = document.getElementById('btn-follow');

    followButton.addEventListener('click', function() {
        login(function(accessToken) {
            followArtist(accessToken, artistId);
        });
    });

})();
