import { TokenDTO } from "../../models/dto/token.dto";

export interface IKeycloakService {
  login(username: string, password: string): Promise<TokenDTO>;
}
