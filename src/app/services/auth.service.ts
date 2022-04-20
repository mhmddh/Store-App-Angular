import { User } from './../../../.history/src/app/common/models/model_20220413231518';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { LoginResponse } from '../common/models/model'


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiURL = "//127.0.0.1:8000/api";
  private user: User = {};
  constructor(private router: Router, private httpClient: HttpClient) { }


  isLoggedIn() {
    return localStorage.getItem('access_token') != null;
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/admin']);
  }

  loginForm(data: any): Observable<LoginResponse> {
    return this.httpClient
      .post<LoginResponse>(this.apiURL + '/login', data)
      .pipe(
        retry(2),
        catchError(this.errorHandler)
      );
  }


  // After login save token and other values(if any) in localStorage
  setUser(resp: LoginResponse) {
    this.user = { id: resp.data['id'], name: resp.data['name'] };
    localStorage.setItem('user', JSON.stringify(this.user));
    localStorage.setItem('access_token', resp.data['token']);
    this.router.navigateByUrl('admin/products');
  }

  errorHandler(error: { error: { message: string; }; status: any; message: any; }) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}

