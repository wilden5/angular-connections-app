import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  IConversationId,
  IConversationItem,
  IConversationItemTransformed,
  IConversationList,
  IConversationMessage,
  IConversationMessageTransformed,
  IConversationResponse,
  INewConversationMessage,
} from '../models/conversation.model';

@Injectable({
  providedIn: 'root',
})
export class ConversationService {
  public isExceptionSubject = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {}

  transformConversationInformation(groupItem: IConversationItem[]): IConversationItemTransformed[] {
    return groupItem.map((item) => ({
      id: item.id.S,
      companionID: item.companionID.S,
    }));
  }

  transformConversationMessage(
    groupItem: IConversationMessage[]
  ): IConversationMessageTransformed[] {
    return groupItem.map((item) => ({
      authorID: item.authorID.S,
      message: item.message.S,
      createdAt: item.createdAt.S,
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

  getSpecificConversation(
    conversationID: string,
    since?: number
  ): Observable<IConversationResponse> {
    return this.http.get<IConversationResponse>(
      // eslint-disable-next-line max-len
      `https://tasks.app.rs.school/angular/conversations/read?conversationID=${conversationID}&since=${since}`
    );
  }

  sendNewMessageToConversation(message: INewConversationMessage): Observable<void> {
    return this.http.post<void>(
      'https://tasks.app.rs.school/angular/conversations/append',
      message
    );
  }

  deleteConversation(id: string): Observable<void> {
    return this.http.delete<void>(
      `https://tasks.app.rs.school/angular/conversations/delete?conversationID=${id}`
    );
  }
}
