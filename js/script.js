// For help configuring, go to https://github.com/doamatto/5m_loading/wiki/
var conf = {
  yt: "",
  sc: "https://api.soundcloud.com/tracks/815870209",
  vol: 30, // Sets volume for everything

  serverName: "Your Server Name",
  serverFooter: "A certified hood classic.",

  noheadertext: false, // Disables the header text if you have a logo

  bg: "carousel", // Options: static, animated, carousel
  carouselImages: [
    "https://files.catbox.moe/vpqvxx.jpg",
    "https://files.catbox.moe/pzz9cp.jpg",
    "https://files.catbox.moe/mq6k5x.png",
    "https://files.catbox.moe/bh9yy0.png",
    "https://files.catbox.moe/205gkr.jpg",
    "https://files.catbox.moe/d49sa5.jpg",
    "https://files.catbox.moe/efys1k.png"
  ]
};

function init() {
  // To disable music, prepend '//' to 'music();' to comment the line.
  cur_time(); // Displays Current Time
  elapsed(); // Displays Elapsed Time for Joining
  // eta(); // Displays ETA for Joining (doesnt work.. yet) (will break if in browser)
  music(); // Runs Music Engine
  header(); // Disables the header text if you have a logo 
  bg(); // Runs Background Engine
  meta(); // Adds user-meta onto page
  // loadingbar(); // Runs the loading bar (doesnt work.. yet) (will break if in browser)
}

// Runtime util for what time it is
function cur_time() {
  var dd = new Date(),
    h = addZero(dd.getHours()),
    m = addZero(dd.getMinutes());
  document.getElementById('cur_time').innerHTML = `${h}:${m}`;
  setInterval(function() {
    var dd = new Date(),
      h = addZero(dd.getHours()),
      m = addZero(dd.getMinutes());
    document.getElementById('cur_time').innerHTML = `${h}:${m}`;
  }, 60000);
}

// Runtime for adding zeroes to times that are missing zeroes
function addZero(i) {
  if (i <= 9) {
    return `0${i}`;
  } else {
    return i;
  }
}

// Runtime util for the time elapsed
function elapsed() {
  setInterval(() => {
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
  document.getElementById('server-name').style.display = "block";
}

// Runtime check to remove the header where wanted
function header() {
  if (!conf.noheadertext) return; // Cancels if not enabled
  document.getElementById('server-name').style.display = "none";
}

// Runtime util for the music engine
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
  tag.src = "https://w.soundcloud.com/player/api.js"; // Add SC Widget API
  document.head.appendChild(tag);
  setTimeout(() => { // We have to wait for the API to load.
    var widgetIframe = document.getElementById('playeri');
    var widget = SC.Widget(widgetIframe);
    var context = new AudioContext();
    widget.bind(SC.Widget.Events.READY, () => {
      widget.load(conf.sc, {
        auto_play: true,
        show_artwork: false,
        show_user: false,
        single_active: true
      }); // Loads audio into widget
      widget.setVolume(conf.vol); // Sets volume to whatever was configured
      context.resume(); // Temporary solution to https://goo.gl/7K7WLu
      widget.play(); // Ensure audio is playing when loaded
      document.getElementById("mute").style.display = "block";
      var a = false; // Used for checking mute
      document.addEventListener("keypress", (e) => {
        if(e.isComposing || e.keyCode === 32) {
          a = !a;
          if (a === true) {
            document.getElementById("mute").innerHTML = "Press spacebar to unmute the audio.";
          } else if (a === false) {
            document.getElementById("mute").innerHTML = "Press spacebar to mute the audio.";
          }
          widget.toggle(); // Stops music with spacebar
        }
      });
    });
  }, 500);
}

// Runtime bit for playing music via YouTube
function youtube() {
  var tag = document.createElement('script');
  var fST = document.getElementsByTagName('script')[0];
  tag.src = "https://www.youtube.com/iframe_api";
  fST.parentNode.insertBefore(tag, fST);
  window.onYouTubePlayerAPIReady = () => {
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
    document.getElementById("mute").style.display = "block";
    document.addEventListener("keypress", (e) => {
      if (e.isComposing || e.keyCode === 32) {
        p = !p;
        if (!p)
          player.pauseVideo(); // Stops music with spacebar
        document.getElementById("mute").innerHTML = "Press spacebar to unmute the audio.";
        if (p)
          player.playVideo();
        document.getElementById("mute").innerHTML = "Press spacebar to mute the audio.";
      }
    });
  };
}

// A bunch of code for the background engine
function bg() {
  switch (conf.bg) {
  case "rainbow":
    animatedBG();
    break;
  case "carousel":
    carousel();
    break;
  case "static":
  case "simple":
  default:
    break;
  }
}

// Runtime util for loading carousel images
var index = 0;
function carousel() {
  var imgs = conf.carouselImages;
  document.getElementById('app').classList.add("carousel");
  document.getElementsByClassName('server-logo')[0].style.display = "none";
  for (let i = 0; i < imgs.length; i++) {
    var img = document.createElement('img');
    img.src = imgs[i];
    document.getElementById('bg').appendChild(img);
  }
  carouselLogic();
  setInterval(() => { carouselLogic(); }, 6000);
}
function carouselLogic() {
  var elem = document.getElementById('bg').childNodes;
  for (let i = 0; i < elem.length; i++) {
    elem[i].classList.add("fade-out");
    setTimeout(() => {elem[i].style.display = "none";},1000);
    elem[i].classList.remove("fade-in");
    setTimeout(() => {elem[i].classList.remove("fade-out");}, 1000);
  }
  index++;
  if(index > elem.length) { index = 1; }
  setTimeout(() => {elem[index-1].style.display = "block";}, 1000);
  setTimeout(() => {elem[index-1].classList.add("fade-in");}, 100);
}

// Runtime util for the rainbow background loading
function animatedBG() {
  setTimeout(() => {
    let elem = document.getElementsByClassName("sub");
    for (var i = 0; i < elem.length; i++) {
      var a = elem[i].className.split(" ");
      if (a.indexOf("dark-text") == -1) {
        elem[i].className += " " + "dark-text";
      }
    }
    document.body.classList.add("animated");
    return true; // Reports a pass
  }, 10);
}

// Runtime util for the loadingbar
function loadingbar() {
  var count, thisCount = 0;
  const handlers = {
    startInitFunctionOrder(data) {
      count = data.count;
      // data.type could be INIT_BEFORE_MAP_LOADED, INIT_AFTER_MAP_LOADED, or INIT_SESSION
    },
    initFunctionInvoking(data) {
      document.querySelector('.bar span').style.width = ((data.idx / count) * 100) + '%';
    },
    performMapLoadFunction(data) {
      ++thisCount;
      document.querySelector('.bar span').style.width = ((thisCount / count) * 100) + '%';
    }
  }
  window.addEventListener('message', (e) => {
    (handlers[e.data.eventName] || function() {})(e.data);
  }); // Event listener for loading bar
}

function meta() {
  document.getElementById('server-name').innerHTML = conf.serverName;
  document.getElementById("footer-alt").innerHTML = conf.serverFooter
}

window.addEventListener("DOMContentLoaded", () => {
  document.body.style.opacity = "1";
  init();
  if (document.getElementById("server-logo").naturalHeight === 0) {
    return logo();
  }
}); // Hides page until loaded