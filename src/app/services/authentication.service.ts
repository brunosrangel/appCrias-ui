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
import { promise } from "selenium-webdriver";

const TOKEN_NAME = "id_token";
const EXPIRES_AT = "expires_at";
const apiURL = "https://loja-crias-api.herokuapp.com/users/login";
const checkLogin = "https://loja-crias-api.herokuapp.com/users/login";

@Injectable({ providedIn: "root" })
export class AuthenticationService {
  //  JwtResponse: JwtResponse = new JwtResponse();
  constructor(
    private http: HttpClient,
    private router: Router,
    private dateService: DateService
  ) {}

  async LoginSocial(username : string, password: string) : Promise<any>{
    let jwtResponse: JwtResponseC = new JwtResponseC();
    let jwt: JwtResponse;
    let user: UserModel = new UserModel();
    let param = { email: username, password: password };
  }
async CheckLogin (username: string, password: string) : Promise<any>{
  let param = { email: username, password: password };
  
}
  async login(username: string, password: string): Promise<JwtResponse> {
    let jwtResponse: JwtResponseC = new JwtResponseC();
    let jwt: JwtResponse;
    let user: UserModel = new UserModel();
    let param = { email: username, password: password };
    await this.http
      .post(apiURL, param)
      .toPromise()
      .then((data) => {
        let dec = jwt_decode(data["token"]);
        user.email = dec["email"];
        jwtResponse.expirationDate = dec["exp"];
        jwtResponse.token = data["token"];
        jwtResponse.user = user as User;
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

    // localStorage.setItem("id_token", token);
    // localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()));
    localStorage.setItem(TOKEN_NAME, token);
    localStorage.setItem(EXPIRES_AT, JSON.stringify(expiresAt.valueOf()));
  }

  private setSession(authResult: JwtResponse) {
    // const expiresAt = authResult.expirationDate;
    const expiresAt = authResult.expirationDate;
    //console.log("Token expires at " + expiresAt);
    //console.log("Token date and time is " + this.dateService.getShortDateAndTimeDisplay(expiresAt));

    localStorage.setItem(TOKEN_NAME, authResult.token);
    localStorage.setItem(EXPIRES_AT, JSON.stringify(expiresAt.valueOf()));
  }

  clearStorage() {
    localStorage.removeItem(TOKEN_NAME);
    localStorage.removeItem(EXPIRES_AT);
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
