import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const userObject = localStorage.getItem('userObject');
    if (userObject) {
      const userHeaders = JSON.parse(userObject);
      const apiRequest = req.clone({
        setHeaders: {
          'rs-uid': userHeaders.uid,
          'rs-email': userHeaders.email,
          authorization: `Bearer ${userHeaders.token}`,
        },
      });
      return next.handle(apiRequest);
    }
    return next.handle(req);
  }
}
