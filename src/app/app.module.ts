import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MenuListItemComponent } from './features/ui/menu-list-item/menu-list-item.component';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FeaturesComponent } from './features/features.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ConfirmationDialogComponent } from './ui/confirmation-dialog/confirmation-dialog.component';
import { JwtInterceptor } from './util/jwt-interceptor';
import { HttpErrorInterceptor } from './util/http-error-interceptor';
import { NotFoundComponent } from './NotFound/NotFound.component';

import {
  GoogleLoginProvider,
  FacebookLoginProvider,
  SocialLoginModule,
  SocialAuthServiceConfig,
} from 'angularx-social-login';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    MenuListItemComponent,
    FeaturesComponent,
    ConfirmationDialogComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    FlexLayoutModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    SocialLoginModule,
  ],
  //   providers: [
  //     { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  //     { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
  //     [
  //       {

  //         provide: 'SocialAuthServiceConfig',
  //         useValue: {
  //           autoLogin: false,
  //           providers: [
  //             {
  //               id: GoogleLoginProvider.PROVIDER_ID,
  //               provider: new GoogleLoginProvider(
  //                 'clientId'
  //               )
  //             },
  //             {
  //               id: FacebookLoginProvider.PROVIDER_ID,
  //               provider: new FacebookLoginProvider('clientId')
  //             }
  //           ]
  //         } as SocialAuthServiceConfig,

  //   ]
  // ],

  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(environment.idGoogle),
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider(environment.idFacebook),
          },
        ],
      } as SocialAuthServiceConfig,
    },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
