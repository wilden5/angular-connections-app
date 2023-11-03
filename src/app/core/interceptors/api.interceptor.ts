import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { httpConstants } from '../../utils/project-constants';
import { ISearchResponse } from '../../youtube/models/search-response.model';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<ISearchResponse>, next: HttpHandler): Observable<HttpEvent<ISearchResponse>> {
    const apiReq = req.clone({
      url: `${httpConstants.YOUTUBE_BASE_URL}/${req.url}`,
      setParams: {
        key: httpConstants.YOUTUBE_API_KEY,
      },
    });
    return next.handle(apiReq);
  }
}
