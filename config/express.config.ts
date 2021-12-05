import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import i18n from "./i18n.config";
const { loggingMiddleware } = require("chain-perk-library");

import "../server/controllers/index";
import { responses } from "../server/responses";

const app = express();

app.use(responses);
app.use(bodyParser.json({ limit: "25mb" }));
app.use(bodyParser.urlencoded({ limit: "25mb", extended: true, parameterLimit: 50000 }));
app.use(loggingMiddleware);
app.use(i18n.init);
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
