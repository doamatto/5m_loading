// For help configuring, go to https://github.com/doamatto/5m_loading/wiki/
var config = {
    yt: [],
    sc: [],
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

function cur_time() {
    var stat;
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
        document.getElementById('time').innerHTML(now);
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
            b = se - 60;
        } // Round into minutes
        else  {
            a = 0;
            b = se;
        } // Ensure less than one minute doesn't round on accident

        // Set elapsed on page
        document.getElementById('time').innerHTML(`${a}m${b}s elapsed.`);
    }, 1000);
}

// Runtime bit in case the logo is missing
function logo() {
    document.getElementsByClassName('server-logo')[0].style.display = "none";
    document.getElementsByClassName('server-name')[0].style.display = "block";
}

function header() {
    if(!config.noheadertext) return; // Cancels if not enabled
    document.getElementsByClassName('server-name')[0].style.display = "none"; // Makes the header invisible
}