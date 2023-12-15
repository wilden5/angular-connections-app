import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  ICreateConversationResponse,
  IConversationItem,
  IConversationItemTransformed,
  IConversationListResponse,
} from '../model/conversation.model';

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
