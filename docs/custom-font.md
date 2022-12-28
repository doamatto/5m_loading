In v0.4.0, support for loading custom fonts was added. There is only support for fonts loaded over a stylesheet (CSS). Some examples are:
- Inter from [Rasmus Andersson](https://rsms.me) ( https://rsms.me/inter/inter.css ), and:
- Roboto from [Google](https://about.google) ( https://fonts.googleapis.com/css2?family=Roboto&display=swap )

To add a font, change the `fontUrl` variable to the URL for your font's stylesheet. Then, change the `fontName` variable to the following format: `"'FONTNAME', FONTTYPE"`, where `FONTNAME` is the name of the font on the stylesheet and `FONTTYPE` is one of the following: `monospace`, `sans-serif`, or `serif`.

An example installation is:
```js
var conf = {
  // [rest of document]
  fontUrl: "https://cdn.doamatto.xyz/inter.min.css",
  fontName: "'Inter var experimental', sans-serif",
  // [rest of document]
};
```