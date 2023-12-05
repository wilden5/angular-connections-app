import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IGroup, IGroupItem, IGroupItemTransformed } from '../models/group.model';

@Injectable({
  providedIn: 'root',
})
export class GroupService {
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
}
