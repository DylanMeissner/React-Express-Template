import { Request, Response } from "express";
import * as path from "path";
import { loadEnvironment } from "../utils/loadEnvironment";
import config from "../webpack.config";

loadEnvironment();

const express = require("express");
const app = express();

const isProduction = process.env.NODE_ENV == "production";
const port = process.env.PORT || 3000;
const DIST_DIR = path.join(__dirname, "../dist");

// Step 1: Create & configure a webpack compiler
const webpack = require("webpack");
const webpackConfig = config;
const compiler = webpack(webpackConfig);

if (!isProduction) {
  // Step 2: Attach the dev middleware to the compiler & the server
  app.use(
    require("webpack-dev-middleware")(compiler, {
      publicPath: webpackConfig?.output?.publicPath
    })
  );

  // Step 3: Attach the hot middleware to the compiler & the server
  app.use(
    require("webpack-hot-middleware")(compiler, {
      log: console.log,
      path: "/__webpack_hmr",
      heartbeat: 10 * 1000
    })
  );
}

app.use(express.static(DIST_DIR));
app.use(express.static("public"));

// Serve generated views from the dist folder with the ejs view engine.
app.set("view engine", "ejs");
app.set("views", path.join(DIST_DIR, "views"));

app.get("/", (req: Request, res: Response) => {
  res.render("home");
});

app.get("/about", (req: Request, res: Response) => {
  res.render("about");
});

app.listen(port, function () {
  console.log("App listening on port: " + port);
});
