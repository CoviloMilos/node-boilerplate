import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import i18n from "./i18n.config";
import { CONSTS } from ".";
import "../server/controllers/index";

const { loggerConfig, responsesMiddleware } = require("chain-perk-library");
const loggerMiddleware = loggerConfig(CONSTS.SERVICE_NAME);
const app = express();

app.use(bodyParser.json({ limit: "25mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "25mb",
    extended: true,
    parameterLimit: 50000,
  }),
);
app.use(bodyParser.json());

app.use(responsesMiddleware);
app.use(loggerMiddleware);

app.use(i18n.init);

app.use((req, res, next) => {
  if (req.headers["accept-language"] != null) {
    i18n.setLocale(req.headers["accept-language"]);
  } else if (CONSTS.LANGUAGE) {
    i18n.setLocale(CONSTS.LANGUAGE);
  } else {
    i18n.setLocale("en");
  }
  next();
});

app.use(cors({ credentials: true, origin: [process.env.LOCAL_PORTAL!] }));
export const expressApp = app;
