import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import i18n from './i18n.config';
import * as swagger from 'swagger-express-ts';
const { loggingMiddleware, setServiceName } = require('chain-perk-library');

import '../server/controllers/index';
import { responses } from '../server/responses';

//Logger service name
setServiceName('boiler-plate');

const app = express();

app.use(responses);
app.use(bodyParser.json({ limit: '25mb' }));
app.use(bodyParser.urlencoded({ limit: '25mb', extended: true, parameterLimit: 50000 }));
app.use(loggingMiddleware);
app.use(i18n.init);

app.use('/api-docs/swagger', express.static('swagger'));
app.use('/api-docs/swagger/assets', express.static('node_modules/swagger-ui-dist'));
app.use(bodyParser.json());

app.use(
  swagger.express({
    definition: {
      externalDocs: {
        url: 'Boilerplate',
      },
      info: {
        title: 'Boilerplate',
        version: '1.0',
      },
      securityDefinitions: {
        apiKeyHeader: {
          type: swagger.SwaggerDefinitionConstant.Security.Type.API_KEY,
          in: swagger.SwaggerDefinitionConstant.Security.In.HEADER,
          name: 'Authorization',
        },
      },
    },
  })
);

app.use((req, res, next) => {
  if (req.headers['accept-language'] != null) {
    i18n.setLocale(req.headers['accept-language']);
  } else if (process.env.LANGUAGE != null) {
    i18n.setLocale(process.env.LANGUAGE);
  } else {
    i18n.setLocale('nl');
  }
  next();
});

app.use(cors({ credentials: true, origin: [process.env.LOCAL_PORTAL!] }));
export const expressApp = app;
