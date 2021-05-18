export interface User {
  id: string;
  email: string;
  username: string;
  nome: string;
  password: string;
  perfil: number;
  idToken: string;
  createAt: Date;
  updateAt: Date;
  status: number;
  imageUrl: string;
  authToken: string;
  UserDetail: UserDetail;
}

export class UserModel {
  id: string;
  email: string;
  username: string;
  nome: string;
  password: string;
  perfil: number;
  idToken: string;
  createAt: Date;
  updateAt: Date;
  status: number;
  imageUrl: string;
  authToken: string;
  UserDetail: UserDetailModel;
}

export class UserDetailModel {
  id: string;
  dataNascimento: Date;
  dataIniciacao: Date;
  orixa: string;
  telefone: string;
  profissao: string;
  escolaridade: string;
  diaPagamento: Date;
  valorPagamento: number;
  endereco: string;
  empregado: boolean;
  obs: string;
}

export interface UserDetail {
  id: string;
  dataNascimento: Date;
  dataIniciacao: Date;
  orixa: string;
  telefone: string;
  profissao: string;
  escolaridade: string;
  diaPagamento: Date;
  valorPagamento: number;
  endereco: string;
  empregado: boolean;
  obs: string;
}
