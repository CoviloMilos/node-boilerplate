import "reflect-metadata";
import "./config";
import { container } from "./config/inversify.config";
import { InversifyExpressServer } from "inversify-express-utils";
import { CONSTS, DbConnection, expressApp } from "./config";
import { handleErrorMiddleware } from "./server/middlewares";

const server = new InversifyExpressServer(container, null, { rootPath: "/" }, expressApp);
server.setErrorConfig((app) => {
  app.use(handleErrorMiddleware);
});

const appConfigured = server.build();
DbConnection.initConnection();
console.log("Getting ready to start the server...");
appConfigured.listen(CONSTS.PORT, () => console.log(`Service ${CONSTS.SERVICE_NAME} started on port: ${CONSTS.PORT}`));
