import { UserDetailModel } from "./UserDetailModel";

export class UserModel {
  id?: number;
  email: string;
  username: string;
  nome: string;
  password: string;
  perfil?: number;
  idToken: string;
  createAt: Date;
  updateAt: Date;
  status: number;
  imageUrl: string;
  authToken: string;
  UserDetail: UserDetailModel;
}

