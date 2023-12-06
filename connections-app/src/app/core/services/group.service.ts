import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { IGroup, IGroupItem, IGroupItemTransformed } from '../models/group.model';

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  public isExceptionSubject = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {}

  transformProfileInformation(groupItem: IGroupItem[]): IGroupItemTransformed[] {
    return groupItem.map((item) => ({
      id: item.id.S,
      name: item.name.S,
      createdAt: item.createdAt.S,
      createdBy: item.createdBy.S,
    }));
  }

  getGroupList(): Observable<IGroup> {
    return this.http.get<IGroup>('https://tasks.app.rs.school/angular/groups/list');
  }

  deleteGroup(id: string): Observable<void> {
    return this.http.delete<void>(
      `https://tasks.app.rs.school/angular/groups/delete?groupID=${id}`
    );
  }
}
