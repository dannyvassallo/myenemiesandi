(function() {

    function login(callback) {
        var CLIENT_ID = '6b284830006843e7ae7b170725715aed';
        var REDIRECT_URI = 'http://jmperezperez.com/spotify-oauth-jsfiddle-proxy/';
        function getLoginURL(scopes) {
            return 'https://accounts.spotify.com/authorize?client_id=' + CLIENT_ID +
              '&redirect_uri=' + encodeURIComponent(REDIRECT_URI) +
              '&scope=' + encodeURIComponent(scopes.join(' ')) +
              '&response_type=token';
        }

        var url = getLoginURL([
            'playlist-modify-public'
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

    function followPlaylist(accessToken, playlistUri) {
        var parts = playlistUri.split(':');
        $.ajax({
            url: 'https://api.spotify.com/v1/users/' + parts[2] + '/playlists/' + parts[4] + '/followers',
            headers: {
               'Authorization': 'Bearer ' + accessToken
            },
            method: 'PUT',
            success: function() {
                followButton.textContent = 'Following';
            },
            dataType: 'html',
            error: function(e) {
                console.error(e);
            }
        });
    }

    var followButton = document.getElementById('btn-follow'),
        playlistUriInput = document.getElementById('playlist-uri');

    followButton.addEventListener('click', function() {
        login(function(accessToken) {
            followPlaylist(accessToken, playlistUriInput.value);
        });
    });

})();
