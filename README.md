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
Installation of 5M Loading (and just about any other FiveM addon) is super simple. Add the `5m_loading` folder to the resources folder (usually under `server-data/resources`or similar). Then, edit your `server.cfg` file to have `start 5m_loading` (use `ensure` instead of `start` if you don't want the server to work without the loading screen). If you're installing from source, copy all of this (you can exclude the `.github/` folder and the `.gitignore` and `README.md` files if you really want to; everything else is important) into a folder titled "5m_loading." Then, follow the instructions from before.

### Screenshots
There are a good chunk of themes baked into 5m_loading, here are just a few.

![Preview of the 'Simple' theme](https://files.catbox.moe/fc01j9.png)
![Preview of the 'Rainbow' theme](.github/rainbow.gif)

### Acknowledgements
This was inspired from the lack of FiveM loading screens that cut it for me. I wanted to have something simple and clean that I could run on my private server I play with my mates on. This seemed to be the only way. Special thanks to [Nick](http://nicolassaad.com/) for open-sourcing his [cool time engine](https://github.com/nicolassaad/timely-greeting). I used it for properly doing the current time and ported it so it wouldn't need AJAX. Thanks also to [Rishi](https://github.com/rveerepalli) for helping debug some of the music issues and help simplify chunks.

- [FiveM Forum Link](https://forum.cfx.re/t/release-5mloading-yet-another-loading-screen/1459768)
