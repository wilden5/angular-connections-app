import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { startLoading, stopLoading } from '../state/spinner/spinner.actions';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  constructor(private store: Store) {}

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
      this.store.dispatch(startLoading());
      return next.handle(apiRequest).pipe(finalize(() => this.store.dispatch(stopLoading())));
    }
    this.store.dispatch(startLoading());
    return next.handle(req).pipe(finalize(() => this.store.dispatch(stopLoading())));
  }
}
