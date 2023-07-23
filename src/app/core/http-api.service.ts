import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { catchError, shareReplay } from 'rxjs/operators';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root',
})
export class HttpApiService {


  constructor(
    private http: HttpClient,
  ) {}

  // function to throw error
  private formatErrors(error: any) {
    return throwError(error.error);
  }

  // method to send http get request to the server
  get(
    path: string,
    params: HttpParams = new HttpParams(),
    headers: HttpHeaders = new HttpHeaders()
  ): Observable<any> {
   
    return this.http
      .get(`${environment.api_url}${path}`, { headers, params })
      .pipe(shareReplay(), catchError(this.formatErrors));
  }

  // method to send http put request to the server
  put(path: string, body: object = {}): Observable<any> {
   
    return this.http
      .put(`${environment.api_url}${path}`, JSON.stringify(body))
      .pipe(catchError(this.formatErrors));
  }

  // method to send http patch request to the server
  patch(path: string, body: object = {}): Observable<any> {
   
    return this.http
      .patch(`${environment.api_url}${path}`, JSON.stringify(body))
      .pipe(catchError(this.formatErrors));
  }

  // method to send http post request to the server
  post(path: string, body: object = {}): Observable<any> {
   
    return this.http
      .post(`${environment.api_url}${path}`, JSON.stringify(body))
      .pipe(catchError(this.formatErrors));
  }

  // method to send http delete request to the server
  delete(path: string, params: HttpParams = new HttpParams()): Observable<any> {
   
    return this.http
      .delete(`${environment.api_url}${path}`, { params })
      .pipe(catchError(this.formatErrors));
  }
}
