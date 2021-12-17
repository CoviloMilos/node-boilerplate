import dotenv from "dotenv";

if (process.env.NODE_ENV) {
  dotenv.config({
    path: `./.env.${process.env.NODE_ENV}`,
  });
} else {
  throw new Error("NODE_ENV must be defined");
}

export * from "./constants";
export * from "./i18n.config";
export * from "./mongoose.config";
export * from "./express.config";
