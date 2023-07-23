import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
export class HttpRequestInterceptor implements HttpInterceptor {
  constructor( ) {}

  /**
   * Function which will be called for all http calls
   */

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const headersConfig: any = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };

    if (request.body instanceof FormData) {
      delete headersConfig['Content-Type'];
      delete headersConfig['Accept'];
    }
    request = request.clone({ setHeaders: headersConfig });
    return next.handle(request).pipe(
      catchError(error => {
        // intercept the response error
        return of(error.error);
      }) as any
    );
  }



  /**
   * Handling all the 401 type error
   */

  httpError401(error: HttpErrorResponse) {
    alert(error);
  }
}
