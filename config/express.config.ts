import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import i18n from "./i18n.config";

import "../server/controllers/index";
const { loggerConfig, responsesMiddleware } = require("chain-perk-library");
//Logger service name
const loggerMiddleware = loggerConfig("boilerplate");
const app = express();

app.use(responsesMiddleware);
app.use(bodyParser.json({ limit: "25mb" }));
app.use(bodyParser.urlencoded({ limit: "25mb", extended: true, parameterLimit: 50000 }));
app.use(loggerMiddleware);
app.use(i18n.init);

app.use(bodyParser.json());

app.use((req, res, next) => {
  if (req.headers["accept-language"] != null) {
    i18n.setLocale(req.headers["accept-language"]);
  } else if (process.env.LANGUAGE != null) {
    i18n.setLocale(process.env.LANGUAGE);
  } else {
    i18n.setLocale("nl");
  }
  next();
});

app.use(cors({ credentials: true, origin: [process.env.LOCAL_PORTAL!] }));
export const expressApp = app;
