There are four backgrounds as of v0.3.0 in 5mLoading:
- **Static:** a simple dark background
- **Rainbow:** an animated gradient of a rainbow that slides through while you wait, and:
- **Carousel:** an image slideshow that can slide through several images in a constant loop while you wait.

## Setting your Background
Inside of `script.js`, the first couple of lines read the following:
```js
var conf = {
  // There should be more here than mentioned; this is shortened for brevity purposes
  bg: "static", // Options: static, animated, carousel
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
```

By changing the value of bg to:
- `"static"`, you get the **Static** background,
- `"animated"`, you get the **Rainbow** background,
- `"carousel"`, you get the **Carousel** background; and:
- `"video"`, you get to use a video as a background.

## Configuring Carousel Images
The image carousel can have a virtually endless amount of pictures. I personally recommend no more than ten, as these pictures do still have to be downloaded and embed into the loading screen.

Following [the rules of JavaScript arrays](https://www.w3schools.com/js/js_arrays.asp), you can easily add and remove pictures as you please. To add a new link to the list, you can add the following to the `carouselImages` array:
```js
  carouselImages: [
    "https://example.org/totally-real-picture.png"
  ]
```

If you have an issues with adding new items to this array, ensure you're following the general rules outlined from the link above and, if you're still having problems, [create an issue](https://github.com/doamatto/5m_loading/issues/new) with your config included.

## Configuring video backgrounds
After changing to the `"video"` mode, you need to set the value for `video`. This can be anything that is a valid video format supported by [the <video> element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Video).

It's recommended that videos are kept short and compressed to allow quick loading and little to no issues while the loading screen loads. Video audio will not be played— this is intended as it adds unnecessary friction to the music engine.