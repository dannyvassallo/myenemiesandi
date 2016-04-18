(function( $ ) {
  $.Tweet = function( element ) {
    this.$el = $( element );
    if( this.$el.length ) {
      this.init();
    }
  }

  $.Tweet.prototype = {
    init: function() {
      this.$chars = this.$el.find( "#chars-left" );
      this.$text = this.$el.find( "#tweet" );
      this.$response = this.$el.find( "#response" );

      this.count();
      this.send();
    },
    send: function() {
      var self = this;
      self.$el.on( "submit", function( e ) {
        e.preventDefault();
        var tweet = self.$text.val();
        $.post( "lib/ajax.php", { tweet: tweet }, function( data ) {
          if( data.id && /^\d+$/.test( data.id ) ) {
            self.$response.text( "Tweet sent successfully" );
          }
        });

      });
    },
    count: function() {
      var self = this;
      var left = 140;
      self.$text.on( "keydown", function( e ) {
        var code = e.keyCode;
        var remaining = 0;
        if( code !== 8 ) {
          remaining = left--;
        } else {
          remaining =  left++;
          if( remaining >= left ) {
            remaining = left;
          }
        }

        if( remaining <= 0 ) {
          self.$chars.addClass( "exceed" );
        } else {
          self.$chars.removeClass( "exceed" );
        }

        self.$chars.text( remaining );
      });

      self.$text.on( "paste", function() {
        setTimeout(function() {
        var value = self.$text.val();
        var rem = left - value.length;
        if( rem <= 0 ) {
          self.$chars.addClass( "exceed" );
        } else {
          self.$chars.removeClass( "exceed" );
        }

        self.$chars.text( rem );
        }, 300);
      });

    }
  };

  $(function() {
    var $tweet = new $.Tweet( "#tweet-form" );
  });

})( jQuery );
