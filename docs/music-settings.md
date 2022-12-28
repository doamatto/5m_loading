Music is a great thing. Why not put it on your loading screen?
---

In v0.4.0, support for shuffling playlists was added. To disable it, simply change the `shuffle` variable from `true` to `false`.

5mLoading supports both YouTube and Soundcloud playlists (with plans for more platforms in the future).

Do note that on both platforms your playlist needs to be either public or unlisted (in SoundCloud's case, private playlists can be used if you own the playlist.

If you are using a YouTube playlist:
- Make sure you use the playlist ID (not a video ID) for the `yt` variable when configuring. You can find yours by doing the following:

> 1. Go to your playlist and copy the URL.
> 2. Everything after the equal sign is your playlist ID. (If your URL is `https://youtube.com/playlist?list=PLkIGJ7Ljv6YxQNZHEcHouUHPYcQXTO86s`, then your ID is `PLkIGJ7Ljv6YxQNZHEcHouUHPYcQXTO86s`)
> 3. Profit!

- Ensure the videos and the playlist all support embedding.
- Ensure the videos do not contain copyrighted music. Chances are that those videos won't be embeddable.

If you are using a Soundcloud playlist:
- Make sure you use the playlist API ID (not a song or playlist URL) for the `sc` variable when configuring. You can find yours by doing the following:

> 1. Go to your playlist, click the share button, and go to the `Embed` tab.
> 2. Look at the `src` attribute and delete everything else.
> 3. Look for a part of the URL that looks like this: `url=https%3A//api.soundcloud.com/tracks/########`
> 4. Remove the `url=` and replace `%3A` with a colon (`:`). You should now have something like this: `https://api.soundcloud.com/tracks/47580057`
> 5. Profit! That's your API ID url.

- Ensure the songs and the playlist support embedding.