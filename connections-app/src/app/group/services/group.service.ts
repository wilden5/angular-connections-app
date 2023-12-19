import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IGroupCreationResponse, IGroupResponse } from '../model/group.model';

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  constructor(private http: HttpClient) {}

  getGroupList(): Observable<IGroupResponse> {
    return this.http.get<IGroupResponse>('https://tasks.app.rs.school/angular/groups/list');
  }

  deleteGroup(id: string): Observable<void> {
    return this.http.delete<void>(
      `https://tasks.app.rs.school/angular/groups/delete?groupID=${id}`
    );
  }

  createNewGroup(name: string): Observable<IGroupCreationResponse> {
    return this.http.post<IGroupCreationResponse>(
      'https://tasks.app.rs.school/angular/groups/create',
      {
        name,
      }
    );
  }
}
