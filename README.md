# 5M Loading
Put simply, **5M Loading is just another loading screen for FiveM.**

Put in more detail, 5M Loading is a feature-rich, customizable, and lightweight loading screen. Some of its notable features are:
- Play music from YouTube or Soundcloud while you wait for loading. (WIP)
- Show the time elapsed for loading into the game and ETA (WIP)
- Easy to customize footer text
- Display a video, GIF, or a slideshow while the game loads
- Add a logo to your loading screen

Put into even more grave detail, all of this is planned and most of it hasn't been done yet. I'm only now starting to dabble in FiveM modding. If I like it, you can expect a bit more of this in future, as well as for other games.

### Installing
Installation of 5M Loading (and just about any other FiveM addon) is super simple. Add the `5m_loading` folder to the resources folder (usually under `server-data/resources`or similar). Then, edit your `server.cfg` file to have `start 5m_loading` (use `ensure` instead of `start` if you don't want the server to work without the loading screen)

### Acknowledgements
This was inspired from the lack of FiveM loading screens that cut it for me. I wanted to have something simple and clean that I could run on my private server I play with my mates on. This seemed to be the only way. Thanks to developers like [Nigol (dev of a FiveM loading screen addon)](https://github.com/raitnigol) for making your software open-source so I can learn from both examples and documentation. Special thanks to [Nicolas](http://nicolassaad.com/) for open-sourcing his [cool time engine](https://github.com/nicolassaad/timely-greeting). I used it for properly doing the current time and ported it so it wouldn't need AJAX.
