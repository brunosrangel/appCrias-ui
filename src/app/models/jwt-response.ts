import { User } from './user';

export interface JwtResponse {

    token: string ;
    expirationDate: number;
    user: User;
}
export class JwtResponseC {

  token: string ;
  expirationDate: number;
  user: User;
}
