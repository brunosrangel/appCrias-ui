import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "../services/authentication.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { JwtResponse } from "../models/jwt-response";
import { UrlService } from "../services/url.service";
import { UserService } from "../features/service/user.service";
import { UsersService } from "../services/user.service";
import { AlertService } from "../ui/alert/alert.service";
import { HttpErrorResponse } from "@angular/common/http";

// import { SocialAuthService } from 'lib';
// import { SocialUser } from 'lib';
// import {
//   GoogleLoginProvider,
//   FacebookLoginProvider,
//   AmazonLoginProvider,
//   VKLoginProvider,
//   MicrosoftLoginProvider
// } from 'lib';
import {
  FacebookLoginProvider,
  GoogleLoginProvider,
  SocialAuthService,
  SocialUser,
} from "angularx-social-login";
import { UserModel } from "../models/user";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  formSubmitted: boolean = false;
  user: SocialUser;
  GoogleLoginProvider = GoogleLoginProvider;
  loggedIn: boolean;
  datauser = new UserModel();
  constructor(
    private fb: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute,
    private urlService: UrlService,
    private userService: UserService,
    private alertService: AlertService,
    private authService: SocialAuthService,
    private _usersService: UsersService
  ) {}

  ngOnInit() {
    this.authenticationService.clearStorage();

    this.form = this.fb.group({
      username: ["", Validators.compose([Validators.required])],
      password: ["", Validators.compose([Validators.required])],
    });
  }

  async loginSocial(User: UserModel) {
    this.alertService.clear();
    let resp;
    await this.authenticationService
      .CheckLogin(User.email, User.password)
      .then((jwt) => {
        resp = jwt;
        if (jwt.messageId == 1) {
          this._usersService
            .CreateUserSocial(this.datauser)
            .then((ret) => {
              this.RunAuth();
            })
            .catch((error) => {
              console.log(error);
            });
        }
        if (jwt.messageId == 5) {
          this.RunAuth();
        }
      })
      .catch((err) => {
        this.handleLoginError(err);
        this.formSubmitted = false;
      });
  }
  RunAuth() {
    this.authenticationService
      .login(this.datauser.email, this.datauser.password)
      .then((jwt) => {
        this.handleLoginResponse(jwt);
      })
      .catch((err) => {
        this.handleLoginError(err);
        this.formSubmitted = false;
      });
  }
  async onSubmit(loginForm) {
    this.alertService.clear();
    this.formSubmitted = true;

    if (this.form.valid) {
      let username = this.form.controls["username"].value;
      let password = this.form.controls["password"].value;
      let jwtRet: JwtResponse;

      await this.authenticationService
        .login(username, password)
        .then((jwt) => {
          this.handleLoginResponse(jwt);
        })
        .catch((err) => {
          this.handleLoginError(err);
          this.formSubmitted = false;
        });
    } else {
      this.formSubmitted = false;
    }
  }

  private handleLoginError(err: Error) {
    console.error(err);

    if (err instanceof HttpErrorResponse) {
      if (err.status == 401) this.alertService.error("Invalid credentials");
      else this.alertService.error("Unexpected error - please contact support");
    }

    this.formSubmitted = false;
  }

  private handleLoginResponse(jwtResponse: JwtResponse) {
    if (jwtResponse && jwtResponse.token) {
      this.userService.user = jwtResponse.user;
      this.goToRoute();
    }

    this.formSubmitted = false;
  }

  private goToRoute() {
    let map: ParamMap = this.route.snapshot.queryParamMap;
    let returnUrl = map.get("returnUrl");
    let queryParams: any = {};

    if (returnUrl) {
      queryParams = this.urlService.getQueryParams(returnUrl);
      returnUrl = this.urlService.shortenUrlIfNecessary(returnUrl);
    } else {
      returnUrl = "/dashboard";
    }

    this.router.navigate([returnUrl], queryParams);
  }
  signInWithGoogle(): void {
    let userData;

    this.authService
      .signIn(GoogleLoginProvider.PROVIDER_ID)
      .then(async (data) => {
        userData = data;
        this.datauser.email = data.email;
        this.datauser.idToken = data.idToken;
        this.datauser.imageUrl = data.photoUrl;
        this.datauser.password = data.id;
        (this.datauser.status = 5),
          (this.datauser.nome = data.name),
          (this.datauser.perfil = 0),
          (this.datauser.authToken = data.authToken);

        await this.loginSocial(this.datauser)
          .then()
          .catch((err) => {
            this.alertService.error(err);
          });
      })
      .catch((err) => console.log(err));
  }

  signInWithFB(): void {
    let user;
    this.authService
      .signIn(FacebookLoginProvider.PROVIDER_ID)
      .then((data) => {
        user = data;
      })
      .catch((error) => this.alertService.error(error));
  }
}
