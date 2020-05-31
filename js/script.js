// For help configuring, go to https://github.com/doamatto/5m_loading/wiki/
var conf = {
    yt: [],
    sc: ['https://soundcloud.com/monstercat/sets/half-an-orange-mostly-we-1'],
    vol: 40, // Sets volume for everything

    noheadertext: false // Disables the header text if you have a logo
}

function init() {
    // To disable music, prepend '//' to 'music();' to comment the line.
    cur_time(); // Displays Current Time (not tested)
    elapsed(); // Displays Elapsed Time for Joining (not tested)
    // eta(); // Displays ETA for Joining
    // music(); // Runs Music Engine
    header(); // Disables the header text if you have a logo 
}

window.onload = function(){init();}

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
        var tDiff = e / 1000; // Bring into seconds from ms
        var se = Math.round(tDiff); // Round second count
        if(se >= 60) {
            a = se /60;
            a = Math.round(a);
            b = se - 60;
        } // Round into minutes
        else  {
            a = 0;
            b = se;
        } // Ensure less than one minute doesn't round on accident

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
    document.getElementsByClassName('server-name')[0].style.display = "none"; // Makes the header invisible
}

function music() {
    // This function ensures there is data to provide to the respective music engines
    if (conf.yt === "" && conf.sc === "")
        return console.error("You should disable music to prevent any unwanted bugs.");
    if (conf.yt === "" || conf.sc !== "")
        soundcloud();
    if (conf.yt !== "" || conf.sc === "")
        youtube();
    if (conf.yt === "" || conf.sc === "")
        return console.error("You provided both a Soundcloud and YouTube playlist");
}

// Runtime bit for playing music via SoundCloud
function soundcloud() {
    var player;
    var emb = document.getElementById("iframei");
    var scr = document.createElement('script')
    scr.script = "https://w.soundcloud.com/player/api.js"; // Loads the SC Widget API for ease with these next titbits
    var fs = document.getElementsByTagName('script')[0];
    fs.parentNode.insertBefore(scr, fs); // Puts SC Widget API into Document
    player = SC.Widget(emb);
    player.load(conf.sc, {
        autoplay: true,
        buying: false,
        sharing: false,
        download: false,
        show_artwork: false,
        show_playcount: false,
        show_user: false,
        single_active: true
    }); // Loads audio into widget
    player.setVolume(conf.vol); // Sets volume to whatever was configured
    player.play(); // Ensure audio is playing when loaded
    document.addEventListener("keypress", e => {
        if(e.isComposing || e.keyCode === 32) {
            player.toggle(); // Stops music with spacebar
        }
    });
}

function bg() {}

// Runtime bit for a video background
function video() {}

// Runtime bit for a dynamic slideshow based off the time of day
function dyn_slideshow() {}