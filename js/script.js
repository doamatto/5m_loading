function init() {
    // To disable music, prepend '//' to 'music();' to comment the line.
    loadConf(); // Loads config file
    cur_time(); // Displays Current Time (not tested)
    elapsed(); // Displays Elapsed Time for Joining (not tested)
    // eta(); // Displays ETA for Joining
    music(); // Runs Music Engine
    header(); // Disables the header text if you have a logo 
    // bg(); // Runs Background Engine
}

window.onload = function(){init();}

function loadConf() {
    var tag = document.createElement('script');
    var fST = document.getElementsByTagName('script')[0];
    try {
        tag.src = "config.js"; // Load config
        fST.parentNode.insertBefore(tag, fST);
    } catch (err) {
        return console.error("[5mloading] Ensure your config.js is properly setup and doesn't have any issues. Error: " + err);
    }
    setTimeout(function(){}, 500); // Ensures data is loaded before proceeding
}

function cur_time() {
    var d = new Date();
    var m = d.getMonth();
    var day = d.getDate();
    var wd = d.getDay();
    
    if (m < 2 || m > 10) { return false; }
    if (m > 2 && m < 10) {
      var prevSun = day - wd;
      if (m == 2) return prevSun >= 8;
      return prevSun <= 0;
    }

    setInterval(function() {
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

        // Set time on page
        var r = now.match(/.{1,2}/g);
        document.getElementById('cur_time').innerHTML = `${r[0]}:${r[1]}`;
    }, 3600000);
}

function elapsed() {
    setInterval(function() {
        var a, b;
        var e = performance.now(); // Get time every second
        var tDiff = Math.round(e / 1000); // Bring into seconds from ms
        a = tDiff / 60; // Solve s to m
        a = Math.floor(a); // Round down to smallest m (good for fractionslike 5/3)
        b = tDiff % 60; // Rounds seconds and keeps under 60.

        // Set elapsed on page
        document.getElementById('time').innerHTML = `${a}m${b}s elapsed.`;
    }, 1000);
}

// Runtime bit in case the logo is missing
function logo() {
    document.getElementsByClassName('server-logo')[0].style.display = "none";
    document.getElementsByClassName('server-name')[0].style.display = "block";
}

function header() {
    if(!conf.noheadertext) return; // Cancels if not enabled
    document.getElementsByClassName('server-name')[0].style.display = "none";
}

function music() {
    // This function ensures there is data to provide to the respective music engines
    if (conf.yt === "" && conf.sc === "") // No values for either source
        return console.error("[5mloading] Either you misconfigured your music, or you aren't using it. Please disable such in js/script.js to resolve this error.");
    if (conf.yt !== "" && conf.sc !== "") // Values for both sources
        return console.error("[5mloading] You provided both a Soundcloud and YouTube playlist");
    if (conf.sc !== "" || conf.sc !== undefined) // Value for Soundcloud
        soundcloud();
    if (conf.yt !== "" || conf.yt !== undefined) // Value for YouTube
        youtube();
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
                context.resume();
                widget.play(); // Ensure audio is playing when loaded
                document.addEventListener("keypress", e => {
                    if(e.isComposing || e.keyCode === 32) {
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
    }
}

function bg() {}

// Runtime bit for a video background
function video() {}

// Runtime bit for a dynamic slideshow based off the time of day
function dyn_slideshow() {
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
        if(slideIndex>x.length) { slideIndex = 1 };
        x[slideIndex-1].style.display = "block";
        setTimeout(carousel, 5000); // Keep repeating it
    }
}