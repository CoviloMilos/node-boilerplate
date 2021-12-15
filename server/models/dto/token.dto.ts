export class TokenDTO {
  access_token: string;
  expires_at: number;
  refresh_expires_in: number;
  refresh_token: string;
  token_type: string;
  session_state: string;
  scope: string;
}
