# 5M Loading
Put simply, **5M Loading is just another loading screen for FiveM.**

Put in more detail, 5M Loading is a feature-rich, customizable, and lightweight loading screen. Some of its notable features are:
- Play music from YouTube or Soundcloud while you wait for loading.
- Show the time elapsed for loading into the game
- Easy to customize footer text
- Add a logo to your loading screen

You can see the progress on [this Trello board.](https://trello.com/b/aePOCnqI)

Put into even more grave detail, all of this is planned and most of it hasn't been done yet. I'm only now starting to dabble in FiveM modding. If I like it, you can expect a bit more of this in future, as well as for other games.

### Installing
Installation of 5M Loading (and just about any other FiveM addon) is super simple. Add the `5m_loading` folder to the resources folder (usually under `server-data/resources`or similar). Then, edit your `server.cfg` file to have `start 5m_loading` (use `ensure` instead of `start` if you don't want the server to work without the loading screen)

### Features Coming Soon
To get v0.1 out (a bit late, sorry again!), I had to gut these features (they'll be in v0.2):
- **Display a video, GIF, or a slideshow while the game loads** This is being held back mostly by Imgur's API. I don't want to use it. I'm doing my best to find a good alternative but am still empty handed. Please bare with me on this one.

### Acknowledgements
This was inspired from the lack of FiveM loading screens that cut it for me. I wanted to have something simple and clean that I could run on my private server I play with my mates on. This seemed to be the only way. Special thanks to [Nick](http://nicolassaad.com/) for open-sourcing his [cool time engine](https://github.com/nicolassaad/timely-greeting). I used it for properly doing the current time and ported it so it wouldn't need AJAX. Thanks also to [Rishi](https://github.com/rveerepalli) for helping debug some of the music issues and help simplify chunks.