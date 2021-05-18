import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { JwtRequest } from "../models/jwt-request";
import { JwtResponse, JwtResponseC } from "../models/jwt-response";
import { tap, shareReplay } from "rxjs/operators";
import { Router } from "@angular/router";
import { DateService } from "./date.service";
import jwt_decode from "jwt-decode";
import { User, UserModel } from "../models/user";

const CreateUserSocial =
  "https://loja-crias-api.herokuapp.com/users/CreateUserSocial";
const GetUserDetail =
  "https://loja-crias-api.herokuapp.com/users/GetUserDetail/";
@Injectable({ providedIn: "root" })
export class UsersService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private dateService: DateService
  ) {}

  async CreateUserSocial(User: UserModel): Promise<any> {
    let ret: any;
    let param = {
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
    let options = { param: { email: email } };
    let ret: any;
    let url = GetUserDetail + email;
    await this.http
      .get(url)
      .toPromise()
      .then((data) => {ret = data["data"]

      })
      .catch((err) => console.log(err));
    console.log(ret)
      return ret;

  }
}
