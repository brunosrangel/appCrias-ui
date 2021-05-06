import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthenticationService } from "../services/authentication.service";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let token = this.authenticationService.token();

    if (token) {
      if (this.authenticationService.isLoggedIn()) {
        request = this.setHeader(request, token);
      }
    }

    return next.handle(request);
  }

  private setHeader(
    request: HttpRequest<any>,
    token: string
  ): HttpRequest<any> {
    debugger;
    request = request.clone({
      setHeaders: {
      // 'Content-Type': 'application/json',
      // 'Access-Control-Allow-Origin': '*',
      // 'Access-Control-Allow-Headers': 'Content-Type',
      // 'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
      //Authorization: `Bearer ${token}`,

      },
    });

    return request;
  }
}
