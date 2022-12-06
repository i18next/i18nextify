var i18next = require("i18next");
var FsBackend = require("i18next-fs-backend");
var middleware = require("i18next-http-middleware");
var express = require("express");
var bodyParser = require("body-parser");
var fs = require("fs");

i18next.use(FsBackend).init({
  lng: "en",
  preload: ["de", "en"],
  saveMissing: true,
  debug: true,
  backend: {
    loadPath: __dirname + "/locales/{{lng}}/{{ns}}.json",
    addPath: __dirname + "/locales/{{lng}}/{{ns}}.missing.json",
  },
  nsSeparator: "#||#",
  keySeparator: "#|#",
});

var app = express();
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(
  middleware.handle(i18next, {
    // ignoreRoutes: ["/foo"],
    // removeLngFromUrl: false
  })
);

app.use("/locales", express.static("locales"));

app.post("/locales/add/:lng/:ns", middleware.missingKeyHandler(i18next));
// app.post('/locales/add/:lng/:ns',function(req, res) {
//   console.warn(req.query, req.body)
// });

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.get("/temp", function (req, res) {
  res.sendFile(__dirname + "/temp.html");
});

app.get("/sub", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.get("/sub/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.get("/i18nextify.min.js", function (req, res) {
  fs.readFile(__dirname + "/../../i18nextify.js", "utf-8", function (err, doc) {
    res.send(doc);
  });
});

app.get("/a.png", function (req, res) {
  res.sendFile(__dirname + "/assets/a.png");
});

app.get("/b.jpeg", function (req, res) {
  res.sendFile(__dirname + "/assets/b.jpeg");
});

// in your request handler
// app.get('myRoute', function(req, res) {
//   var lng = req.language; // 'de-CH'
//   var lngs = req.languages; // ['de-CH', 'de', 'en']
//   req.i18n.changeLanguage('en'); // will not load that!!! assert it was preloaded
//
//   var exists = req.i18n.exists('myKey');
//   var translation = req.t('myKey');
// });

app.listen(3003);
