import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadProfile } from '../../../redux/actions/user.actions';
import { selectUser } from '../../../redux/selectors/user.selectors';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent implements OnInit {
  protected readonly selectUser = selectUser;

  constructor(protected store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(loadProfile());
  }
}
