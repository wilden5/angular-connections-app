import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IDiscussionResponse, INewDiscussionMessage } from '../model/discussion.model';

@Injectable({
  providedIn: 'root',
})
export class DiscussionService {
  constructor(private http: HttpClient) {}

  getDiscussion(conversationID: string, since?: number): Observable<IDiscussionResponse> {
    return this.http.get<IDiscussionResponse>(
      // eslint-disable-next-line max-len
      `https://tasks.app.rs.school/angular/conversations/read?conversationID=${conversationID}&since=${since}`
    );
  }

  sendNewDiscussionMessage(message: INewDiscussionMessage): Observable<void> {
    return this.http.post<void>(
      'https://tasks.app.rs.school/angular/conversations/append',
      message
    );
  }

  deleteDiscussion(id: string): Observable<void> {
    return this.http.delete<void>(
      `https://tasks.app.rs.school/angular/conversations/delete?conversationID=${id}`
    );
  }
}
