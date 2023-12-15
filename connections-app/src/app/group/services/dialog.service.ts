import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  IGroupDialogResponse,
  IGroupMessage,
  IGroupMessageTransformed,
  INewMessage,
} from '../model/dialog.model';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private http: HttpClient) {}

  transformGroupMessage(groupItem: IGroupMessage[]): IGroupMessageTransformed[] {
    return groupItem.map((item) => ({
      authorID: item.authorID.S,
      message: item.message.S,
      createdAt: item.createdAt.S,
    }));
  }

  getGroupDialog(groupId: string, since?: number): Observable<IGroupDialogResponse> {
    return this.http.get<IGroupDialogResponse>(
      `https://tasks.app.rs.school/angular/groups/read?groupID=${groupId}&since=${since}`
    );
  }

  sendNewMessageToDialog(message: INewMessage): Observable<void> {
    return this.http.post<void>('https://tasks.app.rs.school/angular/groups/append', message);
  }
}
