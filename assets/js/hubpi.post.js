$(function() {
  
  "use-strict";

  /* data hubpers with url of json posts */

  var app = {
    self: this,
    href: window.location.href,
    loader: "<div data-loader=\"content\"></div>",
    hubpi: $.hubpi,
    attrPost: $("[data-hp-post]"),
    log: function(value) {
      // simplification > console.log
      console.log(value);
    },
    deploy: function() {
      app.self.reflectPost();
    }
  };
  
    app.hubpi = {};


      app.hubpi.get = {

      pull: function() {
        if (app.attrPost) {
          this.getAJAX("hp-post");
        } 
        else {
          app.log("information:" + " " + "There is no data :(");
        }
      },

      getAJAX: function(suffix) { 
        /* data get json and ajax not cache :) */
        var self = this;
        $.ajaxSetup({
          cache: false
        });

      // loader of data content (JSON is revealed)
      app.attrPost.html(app.loader);
      
      $.getJSON(app.attrPost.data(suffix),function(data) {
        
        var hp = self.relationship(); 
        
        $.each(data,function(_,_item) {  
          hp += self.templatePost(_item);
        });

        app.attrPost.html(hp);
        
      }).error(function(j,t,e) {
        app.attrPost.html('<div data-error="' + "json" + '">' + "Error" + " " + e + '</div>');
        app.log("Error:" + " " + e);
      });
    },
    
    // your div here here :)
    relationship: function() {
      html = ('');
      return html;
    },

    templatePost: function(data) { 
      var tmpl = {
        id: data.id,
        title: data.title,
        content: data.content,
        date: data.date
      }

      /* template post preview */
      html = '<div class="post-view">' + 
             '<header class="header" box-color="blue only">' + 
             '<h1 class="title--post">' + tmpl["title"] + '</h1>' + 
             '</header>' +
             '<div class="preview--post">' +
             '<div box-color="red only" data-post-id="' + tmpl["id"] + '"></div>' +
             '<h2 class="author-info--post">' +
             '<img class="mini-avatar" src="' + $avatar + '" alt="' + $username + '"> By <a href="https://twitter.com/' + $twitter + '">' + $username + '</a> in wrote on <time data-post-date="' + tmpl["date"] + '"></time>' + 
             '</h2>'
             + 
             tmpl.content 
             + 
             '<a href="https://www.facebook.com/sharer/sharer.php?u=' + app.href + '" box-color="facebook" hp-button="share-fb"><span class="fa fa-facebook"></span></a>' +
             '<a href="https://twitter.com/intent/tweet?url=' + app.href + '" box-color="twitter" hp-button="share-tw"><span class="fa fa-twitter"></span></a>' +
             '</div>';

             // preview data in console 
             app.log('Title post : ' + tmpl["title"] + ' | Date :' + tmpl["date"]);
      return html;
    }
  };


  app.self.reflectPost = function() {
      app.hubpi.get.pull();
    }; 

    // run functions
    app.deploy();
});
