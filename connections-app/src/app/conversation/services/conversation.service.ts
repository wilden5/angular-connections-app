import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  ICreateConversationResponse,
  IConversationListResponse,
} from '../model/conversation.model';

@Injectable({
  providedIn: 'root',
})
export class ConversationService {
  constructor(private http: HttpClient) {}

  createConversation(companion: string): Observable<ICreateConversationResponse> {
    return this.http.post<ICreateConversationResponse>(
      'https://tasks.app.rs.school/angular/conversations/create',
      {
        companion,
      }
    );
  }

  getConversationList(): Observable<IConversationListResponse> {
    return this.http.get<IConversationListResponse>(
      'https://tasks.app.rs.school/angular/conversations/list'
    );
  }
}
