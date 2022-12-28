5mLoading supports using your own logo and having your server name.

### Disabling header text when you have a logo
If you don't want the header text to load when you have a logo file, you can set the `noheadertext` value at the top of `script.js` to `true` (basically make the line `noheadertext: false` look like `noheadertext: true`).

### Recommendations for logos
5mLoading searches for the file `img/logo.png` (a file named `logo.png` in the `img` folder). If it's missing, it hides the missing image and displays the header text, regardless of the value of `conf.noheadertext`.