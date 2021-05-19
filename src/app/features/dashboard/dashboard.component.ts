import { Component, OnInit } from "@angular/core";
import { UserModel } from "src/app/models/UserModel";
import { UsersService } from "../../services/user.service";
const TOKEN_NAME = "id_token";
const USER_NAME = "user_name";
const USER_PROFILE = "user_profile";
const USER_EMAIL = "user_email";


@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent implements OnInit {
  userName;
  userDetail: UserModel = new UserModel();
  urlImage ;
  constructor(private _userservice: UsersService) {}

  ngOnInit(): void {
    this.userName = localStorage.getItem(USER_NAME);
    this.getUserDetail();
  }

  async getUserDetail() {
   await this._userservice
      .getUserInformation(localStorage.getItem(USER_EMAIL))
      .then((dt) => {
        this.userDetail = dt as UserModel;
         this.urlImage = this.userDetail.imageUrl;

      })
      .catch((err) => console.log(err));

  }
}
