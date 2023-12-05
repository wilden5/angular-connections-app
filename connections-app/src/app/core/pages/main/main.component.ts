import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { GroupService } from '../../services/group.service';
import { loadGroupList } from '../../../redux/actions/group.actions';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent implements OnInit {
  constructor(
    protected store: Store,
    protected groupService: GroupService
  ) {}

  ngOnInit(): void {
    this.store.dispatch(loadGroupList());
  }
}
