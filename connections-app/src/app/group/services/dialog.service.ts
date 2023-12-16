import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IGroupDialogResponse, INewMessage } from '../model/dialog.model';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private http: HttpClient) {}

  getGroupDialog(groupId: string, since?: number): Observable<IGroupDialogResponse> {
    return this.http.get<IGroupDialogResponse>(
      `https://tasks.app.rs.school/angular/groups/read?groupID=${groupId}&since=${since}`
    );
  }

  sendNewMessageToDialog(message: INewMessage): Observable<void> {
    return this.http.post<void>('https://tasks.app.rs.school/angular/groups/append', message);
  }
}
