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
import {UsersService} from "../services/user.service";
const TOKEN_NAME = "id_token";
const USER_NAME = "user_name";
const USER_PROFILE = "user_profile";
const USER_EMAIL = "user_email";

const EXPIRES_AT = "expires_at";
const apiURL = "https://loja-crias-api.herokuapp.com/users/login";
const checkLogin = "https://loja-crias-api.herokuapp.com/users/CheckLogin";


@Injectable({ providedIn: "root" })
export class AuthenticationService {
  //  JwtResponse: JwtResponse = new JwtResponse();
  constructor(
    private http: HttpClient,
    private router: Router,
    private dateService: DateService,
    private userService : UsersService
  ) {}

  async LoginSocial(username: string, password: string): Promise<any> {
    let jwtResponse: JwtResponseC = new JwtResponseC();
    let jwt: JwtResponse;
    let user: UserModel = new UserModel();
    let param = { email: username, password: password };
  }
  async CheckLogin(username: string, password: string): Promise<any> {
    let param = { email: username, password: password };
    let ret : any;
    let dt: any;
    await this.http.post(checkLogin, param)
    .toPromise()
    .then((dt)=> {
      ret = dt;
     })
    .catch(err => ret = err);

   return ret;
  }
  async login(username: string, password: string): Promise<JwtResponse> {
    const jwtResponse: JwtResponseC = new JwtResponseC();
    let jwt: JwtResponse;
    let user: UserModel = new UserModel();
    let param = { email: username, password: password };
    await this.http
      .post(apiURL, param)
      .toPromise()
      .then((data) => {
        let dec = jwt_decode(data["token"]);
        user.email = dec["email"];
        jwtResponse.profile = dec['perfil'];
        jwtResponse.perfil = dec["perfil"];
        jwtResponse.expirationDate = dec["exp"];
        jwtResponse.token = data["token"];
        jwtResponse.user = user as User;
        jwtResponse.UserName = dec["nome"];

        debugger;
        jwt = jwtResponse as JwtResponse;
        shareReplay();
        this.setSession(jwt);
      })
      .catch((error) => {
        console.log(error.message);
      });

    return jwtResponse;
  }
  private setSessionNew(token: string) {
    var decoded = jwt_decode(token);
    const expiresAt = new Date(decoded["exp"]);

    console.log("Token expires at " + expiresAt);
    console.log(
      "Token date and time is " +
        this.dateService.getShortDateAndTimeDisplay(decoded["exp"])
    );


    localStorage.setItem(TOKEN_NAME, token);
    localStorage.setItem(EXPIRES_AT, JSON.stringify(expiresAt.valueOf()));
  }

  private setSession(authResult: JwtResponse) {
    const expiresAt = authResult.expirationDate;

    localStorage.setItem(TOKEN_NAME, authResult.token);
    localStorage.setItem(EXPIRES_AT, JSON.stringify(expiresAt.valueOf()));
    localStorage.setItem(USER_NAME, authResult.UserName);
    localStorage.setItem(USER_PROFILE, authResult.profile.toString());
    localStorage.setItem(USER_EMAIL, authResult.user.email);


  }

  clearStorage() {
    localStorage.removeItem(TOKEN_NAME);
    localStorage.removeItem(EXPIRES_AT);
    localStorage.removeItem(USER_NAME);
    localStorage.removeItem(USER_EMAIL);
    localStorage.removeItem(USER_PROFILE);
  }

  logout() {
    this.clearStorage();
    this.router.navigate(["/login"]);
  }

  isTokenExpired(): boolean {
    let expiration = this.getExpiration();

    if (expiration) {
      return !(Date.now() < expiration * 1000);
    }

    return false;
  }

  isLoggedIn(): boolean {
    let loggedIn: boolean = false;

    if (this.token()) {
      loggedIn = !this.isTokenExpired();
    }

    return loggedIn;
  }

  isLoggedOut(): boolean {
    return !this.isLoggedIn();
  }

  private getExpiration(): number {
    let expiresAt: number = null;
    const expiration = localStorage.getItem(EXPIRES_AT);

    if (expiration) {
      expiresAt = JSON.parse(expiration);
    }

    return expiresAt;
  }

  token(): string {
    return localStorage.getItem(TOKEN_NAME);
  }
}
