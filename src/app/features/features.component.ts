import { Component, OnDestroy } from '@angular/core';
import { NavItem } from './ui/model/nav-item';
import { MediaChange, MediaObserver } from "@angular/flex-layout";
import { Subscription } from 'rxjs';
import { menu } from './ui/model/menu';
import { UsersService } from '../services/user.service';
const TOKEN_NAME = "id_token";
const USER_NAME = "user_name";
const USER_PROFILE = "user_profile";
const USER_EMAIL = "user_email";
@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.css']
})
export class FeaturesComponent implements  OnDestroy {

    opened: boolean = true;
    private mediaWatcher: Subscription;
    menu: NavItem[] = menu;
  userDetail: any;
  urlImage: any;
  userName: string;

    constructor(private media: MediaObserver ,private _userservice: UsersService) {
        this.mediaWatcher = this.media.media$.subscribe((mediaChange: MediaChange) => {
            this.handleMediaChange(mediaChange);
        })
    }
    ngOnInit(): void {
      this.userName = localStorage.getItem(USER_NAME);
      this.getUserDetail();
    }

    private handleMediaChange(mediaChange: MediaChange) {
        if (this.media.isActive('lt-md')) {
            this.opened = false;
        } else {
            this.opened = true;
        }
    }

    ngOnDestroy() {
        this.mediaWatcher.unsubscribe();
    }
    getUserDetail() {
      this._userservice
        .getUserInformation(localStorage.getItem(USER_EMAIL))
        .then((dt) => {
          this.userDetail = dt;
           this.urlImage = this.userDetail.imageUrl;
        })
        .catch((err) => console.log(err));
      console.log(this.userDetail);
    }
}
