const express = require("express");
const app = express();
const port = 5500;

function use() {
  return app.use(express.json());
}

function listen() {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
}

exports.listentoPort = listen;
exports.expressApp = app;
exports.expressUse = use;
