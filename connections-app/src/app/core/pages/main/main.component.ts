import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { GroupService } from '../../services/group.service';
import { loadGroupList } from '../../../redux/actions/group.actions';
import { selectGroupList } from '../../../redux/selectors/group.selectors';
import { ProjectPages } from '../../../../environment/environment';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent implements OnInit {
  userUid = JSON.parse(localStorage.getItem('userObject') as string).uid;

  constructor(
    protected store: Store,
    protected groupService: GroupService
  ) {}

  ngOnInit(): void {
    this.store.dispatch(loadGroupList());
  }

  protected readonly selectGroupList = selectGroupList;

  protected readonly ProjectPages = ProjectPages;

  protected readonly localStorage = localStorage;
}
