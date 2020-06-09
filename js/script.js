/*jshint esversion: 6*/

// For help configuring, go to https://github.com/doamatto/5m_loading/wiki/
var conf = {
  yt: "",
  sc: "https://api.soundcloud.com/playlists/1054277434",
  vol: 40, // Sets volume for everything

  noheadertext: false // Disables the header text if you have a logo
};

function init() {
  // To disable music, prepend '//' to 'music();' to comment the line.
  cur_time(); // Displays Current Time (not tested)
  elapsed(); // Displays Elapsed Time for Joining (not tested)
  // eta(); // Displays ETA for Joining
  music(); // Runs Music Engine
  header(); // Disables the header text if you have a logo 
  // bg(); // Runs Background Engine (DO NOT ENABLE! IT DOESN'T WORK AT ALL RIGHT NOW)
}

function cur_time() {
  var dateData = new Date(),
    h = dateData.getHours(),
    m = dateData.getMinutes();
  document.getElementById('cur_time').innerHTML = `${h}:${m}`;
  setInterval(function() {
    var dateData = new Date(),
      h = dateData.getHours(),
      m = dateData.getMinutes();
    document.getElementById('cur_time').innerHTML = `${h}:${m}`;
  }, 60000);
}

function elapsed() {
  setInterval(function() {
    var a, b;
    var e = performance.now(); // Get time every second
    var tDiff = Math.round(e / 1000); // Bring into seconds from ms
    a = tDiff / 60; // Solve s to m
    a = Math.floor(a); // Round down to smallest m (good for fractionslike 5/3)
    b = tDiff % 60; // Rounds seconds and keeps under 60.
    document.getElementById('time').innerHTML = `${a}m${b}s elapsed.`; // Set elapsed on page
  }, 1000);
}

// Runtime bit in case the logo is missing
function logo() {
  document.getElementsByClassName('server-logo')[0].style.display = "none";
  document.getElementsByClassName('server-name')[0].style.display = "block";
}

function header() {
  if(!conf.noheadertext) return; // Cancels if not enabled
  document.getElementsByClassName('header')[0].style.display = "none";
}

function music() {
  // This function ensures there is data to provide to the respective music engines
  if (conf.yt === "" && conf.sc === "") // No values for either source
      return console.error("[5mloading] Either you misconfigured your music, or you aren't using it. Please disable such in js/script.js to resolve this error.");
  if (conf.yt !== "" && conf.sc !== "") // Values for both sources
      return console.error("[5mloading] You provided both a Soundcloud and YouTube playlist");
  if (conf.sc !== "" || conf.sc !== undefined) // Value for Soundcloud
      return soundcloud();
  if (conf.yt !== "" || conf.yt !== undefined) // Value for YouTube
      return youtube();
}

// Runtime bit for playing music via SoundCloud
function soundcloud() {
  var tag = document.createElement('script');
  var fST = document.getElementsByTagName('script')[0];
  tag.src = "https://w.soundcloud.com/player/api.js"; // Add SC Widget API
  fST.parentNode.insertBefore(tag, fST);
    setTimeout(function() { // We have to wait for the API to load.
      var widgetIframe = document.getElementById('playeri');
      var widget = SC.Widget(widgetIframe);
      var context = new AudioContext();
      widget.bind(SC.Widget.Events.READY, function() {
        widget.load(conf.sc, {
          auto_play: true,
          show_artwork: false,
          show_user: false,
          single_active: true
        }); // Loads audio into widget
        widget.setVolume(conf.vol); // Sets volume to whatever was configured
        context.resume(); // Temporary solution to https://goo.gl/7K7WLu
        widget.play(); // Ensure audio is playing when loaded
        document.addEventListener("keypress", e => {
          if(e.isComposing || e.keyCode === 32) {
            widget.toggle(); // Stops music with spacebar
          }
        });
      });
    }, 2500);      
}

// Runtime bit for playing music via YouTube
function youtube() {
  var tag = document.createElement('script');
  var fST = document.getElementsByTagName('script')[0];
  tag.src = "https://www.youtube.com/iframe_api";
  fST.parentNode.insertBefore(tag, fST);
  window.onYouTubePlayerAPIReady = function() {
    var p = true;
    var player = new YT.Player("player", {
      height: '1',
      playerVars: {
        autoplay: 1,
        controls: 0,
        disablekb: 1,
        enablejsapi: 1,
        fs: 0,
        list: conf.yt,
        listType: "playlist"
      }
    });
    document.addEventListener("keypress", e => {
      if(e.isComposing || e.keyCode === 32) {
        p = !p;
        if (!p)
          player.pauseVideo(); // Stops music with spacebar
        if (p)
          player.playVideo();
      }
    });
  };
}

/* A bunch of code for the background engine: commented to prevent bugs but to preserve
function bg() {
    // This function ensures there is data to provide to the respective music engines
    if (conf.imgur_albumHash !== "" && conf.static_imageURL !== "") {
        return console.error("[5mloading] You provided both an Imgur album and a static image");
    } // Values for both sources
    if(conf.static_imageURL !== undefined || conf.static_imageURL !== "") {
        document.body.style.backgroundImage = `url ('${conf.static_imageURL}')`;
    } // If a static image is provided
    if(conf.imgur_albumHash !== undefined || conf.imgur_albumHash !== "") {
        return imgur();
    }
    if(conf.static_imageURL !== undefined || conf.staticImageURL !== "" && conf.imgur_albumHashgur !== "" || conf.imgur_albumHash !== undefined) {
        document.body.style.background = "#3b3b3b";
        return;
    } // No data at all
}

// Runtime bit for an Imgur gallery ( AJAX ;-; )
function imgur() {
    var settings = {
        async: false,
        crossDomain: true,
        processData: false,
        contentType: false,
        type: 'GET',
        url: `https://api.imgur.com/3/album/${conf.imgur_albumHash}/images`,
        headers: {
            Authorization: `Client-ID ${conf.imgur_clientID}`,
            Accept: 'application/json'
        },
        mimeType: 'multipart/form-data'
    };
    $.ajax(settings).done(function(data){
        for(var i=0; i<data.length;i++){
            setInterval(function() {
                var imgIndex = 0;
                imgIndex++;
                if(imgIndex > data.length) { imgIndex = 1; }
                document.body.style.backgroundImage = data[imgIndex-1].link;
            }, 2000);
        } // Cycles the Imgur images on the page
    });
}

// Runtime bit for a dynamic slideshow based off the time of day (scheduled for v0.2)
function timebased_slideshow() {
    var d = new Date(); // Init time
    var stat; // Status of the day
    // Morning timing
    var mStart = '0000';
    var mEnd = '1159';
    // Afternoon timing
    var aStart = '1200';
    var aEnd = '1659';
    // Evening timing
    var eStart = '1700';
    var eEnd = '2359';
    // Time formatting
    var f;
    if (d.getHours() <= 9) {
        var eStr = d.getHours().toString();
        f = eStr.replace(/^/,'0');
    } else { f = d.getHours(); } // Check if past 9, prepend 0 if not.
    var now = f + "" + d.getMinutes(); // Set cur_time
    // Check to see timing
    if (now <= mEnd && now >= mStart) {
        stat = "m";
    } else if (now <= aEnd && now >= aStart ) {
        stat = "a";
    } else if (now <= eEnd && now >= eStart ) {
        stat = "e";
    }

    var slideIndex = 0;
    carousel();

    switch(stat) {
        case m: // Morning slideshow
            conf.morning_photos.forEach(addToCarousel(conf.afternoon_photos));
            carousel();
            break;
        case a: // Afternoon slideshow
            conf.afternoon_photos.forEach(addToCarousel(conf.afternoon_photos));
            carousel();
            break;
        case e: // Evening slideshow
            conf.evening_photos.forEach(addToCarousel(conf.afternoon_photos));
            carousel();
            break;
        default: // Just in case :)
            console.error("Something bad happened.");
            break;
    }

    function addToCarousel(img) {
        // Adopted from the player scripts :)
        var imgS = document.createElement('img');
        var fST = document.getElementById('bg');
        imgS.src = img;
        fST.insertBefore(imgS, fST);
    }

    // Automatic slide system
    function carousel() {
        var i;
        var x = document.getElementsByClassName("slide");
        for(i=0;i<x.length;i++) {
            x[i].style.display = "none";
        }
        slideIndex++;
        if(slideIndex>x.length) { slideIndex = 1; }
        x[slideIndex-1].style.display = "block";
        setTimeout(carousel, 5000); // Keep repeating it
    }
}
*/