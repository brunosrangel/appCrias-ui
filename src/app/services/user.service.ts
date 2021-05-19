import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { JwtRequest } from "../models/jwt-request";
import { JwtResponse, JwtResponseC } from "../models/jwt-response";
import { tap, shareReplay } from "rxjs/operators";
import { Router } from "@angular/router";
import { DateService } from "./date.service";
import jwt_decode from "jwt-decode";
import { User } from "../models/user";
import { UserModel } from "../models/UserModel";
const CreateUserSocial =
  "https://loja-crias-api.herokuapp.com/users/CreateUserSocial";
const GetUserDetail =
  "https://loja-crias-api.herokuapp.com/users/GetUserDetail/";
const SaveUsersDetails =
  "https://loja-crias-api.herokuapp.com/users/SaveUsersDetails";
const SaveUsersDetailsLocal = "http://localhost:3000/users/SaveUsersDetails";
@Injectable({ providedIn: "root" })
export class UsersService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private dateService: DateService
  ) {}

  // tslint:disable-next-line: no-shadowed-variable
  async CreateUserSocial(User: UserModel): Promise<any> {
    let ret: any;
    const param = {
      email: User.email,
      password: User.password,
      idToken: User.idToken,
      status: User.status,
      imageUrl: User.imageUrl,
      authToken: User.authToken,
      nome: User.nome,
      perfil: User.perfil,
    };
    await this.http
      .post(CreateUserSocial, param)
      .toPromise()
      .then((dt) => {
        ret = dt;
      })
      .catch((err) => {
        ret = err;
      });
    return ret;
  }
  async getUserInformation(email: string): Promise<any> {
    let ret: any;
    const url = GetUserDetail + email;
    await this.http
      .get(url)
      .toPromise()
      .then((data) => {
        ret = data["data"];
      })
      .catch((err) => console.log(err));
    return ret;
  }

  async SaveUsersDetails(user: UserModel): Promise<any> {
    let ret: any;
        const param = {
      id: user.id,
      dataNascimento: user.UserDetail.dataNascimento,
      dataIniciacao: user.UserDetail.dataIniciacao,
      orixa: user.UserDetail.orixa,
      telefone: user.UserDetail.telefone,
      profissao: user.UserDetail.profissao,
      escolaridade: user.UserDetail.escolaridade,
      diaPagamento: user.UserDetail.diaPagamento,
      valorPagamento: user.UserDetail.valorPagamento,
      endereco: user.UserDetail.endereco,
      empregado: user.UserDetail.empregado,
      obs: user.UserDetail.obs,
      numero: user.UserDetail.numero,
      complemento: user.UserDetail.complemento,
      cidade: user.UserDetail.cidade,
      estado: user.UserDetail.estado,
      cep: user.UserDetail.cep,
      iduserDetail: user.UserDetail.iduserDetail
    };
    console.log(param)
    await this.http
      .post(SaveUsersDetailsLocal, param)
      .toPromise()
      .then((dt) => {
        ret = dt;
      })
      .catch((err) => {
        ret = err;
      });
    return ret;
  }
}
