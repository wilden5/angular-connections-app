import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  IConversationId,
  IConversationItem,
  IConversationItemTransformed,
  IConversationList,
} from '../models/conversation.model';

@Injectable({
  providedIn: 'root',
})
export class ConversationService {
  constructor(private http: HttpClient) {}

  transformConversationInformation(groupItem: IConversationItem[]): IConversationItemTransformed[] {
    return groupItem.map((item) => ({
      id: item.id.S,
      companionID: item.companionID.S,
    }));
  }

  createConversation(companion: string): Observable<IConversationId> {
    return this.http.post<IConversationId>(
      'https://tasks.app.rs.school/angular/conversations/create',
      {
        companion,
      }
    );
  }

  getConversationList(): Observable<IConversationList> {
    return this.http.get<IConversationList>(
      'https://tasks.app.rs.school/angular/conversations/list'
    );
  }
}
