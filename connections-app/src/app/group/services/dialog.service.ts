import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  IGroupDialogResponse,
  IGroupMessage,
  IGroupMessageTransformed,
  INewMessage,
} from '../../core/models/group.model';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  public isExceptionSubject = new BehaviorSubject<boolean>(false);

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
