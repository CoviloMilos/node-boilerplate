import dotenv from "dotenv";

if (process.env.NODE_ENV) {
  dotenv.config({
    path: `./.env.${process.env.NODE_ENV}`,
  });
} else {
  throw new Error("NODE_ENV must be defined");
}

module.exports.PUBSUB_PROJECT_ID = process.env.PUBSUB_PROJECT_ID;
module.exports.PUBSUB_SERVICE_ACCOUNT = process.env.PUBSUB_SERVICE_ACCOUNT;
module.exports.PUBSUB_PRIVATE_KEY = process.env.PUBSUB_PRIVATE_KEY;
module.exports.LOGGING_PAYLOAD_TOPIC = process.env.LOGGING_PAYLOAD_TOPIC;
module.exports.LOG_PUBSUB = process.env.LOG_PUBSUB;
module.exports.LOG_CONSOLE = process.env.LOG_CONSOLE;
module.exports.APP_NAME = process.env.APP_NAME;

export * from "./constants";
export * from "./i18n.config";
