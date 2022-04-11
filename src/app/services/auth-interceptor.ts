import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

import { Observable, throwError } from 'rxjs';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>,
        next: HttpHandler): Observable<HttpEvent<any>> {
        const idToken = localStorage.getItem('access_token');
        
        if (idToken) {
            const cloned = req.clone({
                headers: req.headers.set('Authorization',
                    'Bearer ' + idToken)
            });

            return next.handle(cloned).pipe(
                catchError((error) => {
                    return throwError(error);
                })
            );
        } else {
            return next.handle(req);
        }
    }
}
