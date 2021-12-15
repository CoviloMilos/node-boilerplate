import { IKeycloakService } from "../interfaces/service/ikeycloak.service";
import { TokenDTO } from "../models/dto/token.dto";
import KcAdminClient from "@keycloak/keycloak-admin-client";
import { plainToClass } from "class-transformer";
import { injectable } from "inversify";
import { Issuer } from "openid-client";

// To configure the client, pass an object to override any of these  options:
// {
//   baseUrl: 'http://127.0.0.1:8080/auth',
//   realmName: 'master',
//   requestConfig: {
//     /* Axios request config options https://github.com/axios/axios#request-config */
//   },
// }
const kcAdminClient = new KcAdminClient({
  baseUrl: "http://127.0.0.1:8080/auth",
  realmName: "master",
});

@injectable()
export class KeycloakService implements IKeycloakService {
  constructor() {}
  async login(username: string, password: string): Promise<TokenDTO> {
    await kcAdminClient.auth({
      username: "admin",
      password: "Pa55w0rd",
      grantType: "password",
      clientId: "admin-cli",
      //   totp: "123456", // optional Time-based One-time Password if OTP is required in authentication flow
    });
    const keycloakIssuer = await Issuer.discover("http://localhost:8080/auth/realms/chainperk");
    const client = new keycloakIssuer.Client({
      client_id: "chainperk-app",
      // client_secret: "5c9500cf-e276-4713-82c7-87fdcd505b76",
      token_endpoint_auth_method: "none", // to send only client_id in the header
    });

    let tokenSet = await client.grant({
      grant_type: "password",
      username,
      password,
    });

    console.log(tokenSet);
    const tokenDTO = plainToClass(TokenDTO, tokenSet);

    return tokenDTO;
  }
}
