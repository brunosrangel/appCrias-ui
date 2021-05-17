import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "../services/authentication.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { JwtResponse } from "../models/jwt-response";
import { UrlService } from "../services/url.service";
import { UserService } from "../features/service/user.service";
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

  constructor(
    private fb: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute,
    private urlService: UrlService,
    private userService: UserService,
    private alertService: AlertService,
    private authService: SocialAuthService
  ) {}

  ngOnInit() {
    this.authenticationService.clearStorage();

    this.form = this.fb.group({
      username: ["", Validators.compose([Validators.required])],
      password: ["", Validators.compose([Validators.required])],
    });
  }

  async loginSocial(username: string, password: string) {
    this.alertService.clear();
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
      .then((data) => {
        userData = data;
      })
      .catch((err) => console.log(err));
  }

  signInWithFB(): void {
    let user;
    this.authService
      .signIn(FacebookLoginProvider.PROVIDER_ID)
      .then((data) => {
        user = data;
        debugger;
      })
      .catch((error) => console.log(error));
  }
}
