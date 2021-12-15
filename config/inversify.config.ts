import { Container } from "inversify";
import { IHelloWorldRepository, IHelloWorldService, IKeycloakService, IRequestContextMiddleware } from "../server/interfaces";
import { RequestContextMiddleware } from "../server/middlewares";
import { HelloWorldRepository } from "../server/repository";
import { HelloWorldService, KeycloakService } from "../server/services";
import { TYPES } from "./constants";

export const container = new Container();

container.bind<IHelloWorldService>(TYPES.HelloWorldService).to(HelloWorldService).inTransientScope();
container.bind<IKeycloakService>(TYPES.KeycloakService).to(KeycloakService).inSingletonScope();

container.bind<IHelloWorldRepository>(TYPES.HelloWorldRepository).to(HelloWorldRepository).inTransientScope();

container.bind<IRequestContextMiddleware>(TYPES.RequestContextMiddleware).to(RequestContextMiddleware);
container.bind<string>(TYPES.UserId).toDynamicValue((context) => "");
