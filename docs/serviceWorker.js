importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/3.4.1/workbox-sw.js"
);

// console.log("Hello from the Service Worker");

/*
 * workbox-cli will automatically generate a manifest
 * from workbox-config.js and replace the placeholder below with it.
 */
workbox.precaching.precacheAndRoute([
  {
    "url": "https://aferditamuriqi.github.io/viewer/fetch.js",
    "revision": "0c21273fa3d230f74868a77a92473379"
  },
  {
    "url": "index.html",
    "revision": "0725f1c536b092d7fe16ee89f6cdac5a"
  },
  {
    "url": "manifest.json",
    "revision": "8fe0c037ec85381b63f6807ec4ba0ac3"
  },
  {
    "url": "https://aferditamuriqi.github.io/viewer/material.css",
    "revision": "10fc85384fccf30acf53236b78d6a8af"
  },
  {
    "url": "https://aferditamuriqi.github.io/viewer/material.js",
    "revision": "51309a9135d076e728da506578ecadcc"
  },
  {
    "url": "https://aferditamuriqi.github.io/viewer/r2-reader.css",
    "revision": "64bb7e53026d79bd5ad44c2ed533d04c"
  },
  {
    "url": "https://aferditamuriqi.github.io/viewer/r2-reader.js",
    "revision": "52d1d2c7454feb940cf9caaa9bd0e34b"
  },
  {
    "url": "https://aferditamuriqi.github.io/viewer/readium-css/ReadiumCSS-after.css",
    "revision": "3099be111f1731f947145310622500ae"
  },
  {
    "url": "https://aferditamuriqi.github.io/viewer/readium-css/ReadiumCSS-before.css",
    "revision": "3b83ba9b8e090af0c8066323661b6014"
  },
  {
    "url": "https://aferditamuriqi.github.io/viewer/readium-css/ReadiumCSS-default.css",
    "revision": "a12a9eeb180f804034af108ab220313d"
  }
]);
