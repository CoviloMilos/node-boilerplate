import './config';
import 'reflect-metadata';
import { container } from './config/inversify.config';
import { InversifyExpressServer } from 'inversify-express-utils';
import { Request, Response, NextFunction } from 'express';
import { ResponseError } from './server/models';
import { CONSTS, DbConnection, errors, expressApp } from './config';

const server = new InversifyExpressServer(container, null, { rootPath: '/' }, expressApp);

server.setErrorConfig(app => {
  app.use((err: ResponseError, req: Request, res: Response, next: NextFunction) => {
    switch (err.code) {
      case 400:
        return res.badRequest(err);
      case 401:
        return res.unauthorized(err);
      case 403:
        return res.forbidden(err);
      case 404:
        return res.notFound(err);
      case 409:
        return res.conflict(err);
      case null:
      case undefined:
      case 500:
        return res.serverError(errors.genericServerError(err));
      default:
        return res.badRequest(err);
    }
  });
});
const appConfigured = server.build();
DbConnection.initConnection();
console.log('Getting ready to start the server...');
appConfigured.listen(CONSTS.PORT, () => console.log(`Service ${CONSTS.SERVICE_NAME} started on port: ${CONSTS.PORT}`));
