import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ISearchResponse } from '../../youtube/models/search-response.model';
import { environment } from '../../../environments/environment';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<ISearchResponse>, next: HttpHandler): Observable<HttpEvent<ISearchResponse>> {
    const apiReq = req.clone({
      url: `${environment.YOUTUBE_BASE_URL}/${req.url}`,
      setParams: {
        key: environment.YOUTUBE_API_KEY,
      },
    });
    return next.handle(apiReq);
  }
}
