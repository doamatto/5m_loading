// For help configuring, go to https://github.com/doamatto/5m_loading/wiki/
var conf = {
  yt: "",
  sc: "https://api.soundcloud.com/playlists/1054277434",
  vol: 40, // Sets volume for everything

  noheadertext: false, // Disables the header text if you have a logo

  bg: "simple" // Options: static, animated
};

function init() {
  // To disable music, prepend '//' to 'music();' to comment the line.
  cur_time(); // Displays Current Time (not tested)
  elapsed(); // Displays Elapsed Time for Joining (not tested)
  // eta(); // Displays ETA for Joining
  music(); // Runs Music Engine
  header(); // Disables the header text if you have a logo 
  bg(); // Runs Background Engine (DO NOT ENABLE! IT DOESN'T WORK AT ALL RIGHT NOW)
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
    if (m === "0") { m === "00" }
    if (m <= "9") { m === `0${m}`}
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

// A bunch of code for the background engine
function bg() {
  switch(conf.bg) {
  case "animated":
    animatedBG();
    break;
  case "static":
  case "simple":
  default:
    break;
  }
}

function animatedBG() {
  setTimeout(() => {
    let elem = document.getElementsByClassName("sub");
    for(var i = 0; i < elem.length; i++) {
      var a = elem[i].className.split(" ");
      if (a.indexOf("dark-text") == -1) {
        elem[i].className += " " + "dark-text";
      }
    }
    document.body.classList.add("animated");
    return true; // Reports a pass
  }, 10);
}

window.addEventListener("DOMContentLoaded", () => {
  document.body.style.opacity = "1";
  init()
  if (document.getElementById("server-logo").naturalHeight === 0) return logo()
}); // Hides page until loaded