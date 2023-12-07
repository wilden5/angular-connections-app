import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IConversationId } from '../models/conversation.model';

@Injectable({
  providedIn: 'root',
})
export class ConversationService {
  constructor(private http: HttpClient) {}

  createConversation(companion: string): Observable<IConversationId> {
    return this.http.post<IConversationId>(
      'https://tasks.app.rs.school/angular/conversations/create',
      {
        companion,
      }
    );
  }
}
