import i18n from "i18n";
import path from "path";

import * as endata from "./locales/en.json";

i18n.configure({
  locales: ["en"],
  directory: path.join(__dirname, "./locales"),
  extension: ".json",
});

export default i18n;
