import { ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { take } from 'rxjs';
import { loadProfile, updateUserName } from '../../../redux/actions/user.actions';
import { selectUser, selectUserName } from '../../../redux/selectors/user.selectors';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent implements OnInit {
  @ViewChild('inputName') inputName!: ElementRef;

  protected readonly selectUser = selectUser;

  protected isDisabled = true;

  constructor(protected store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(loadProfile());
  }

  onEditButtonClick(): void {
    this.isDisabled = !this.isDisabled;
  }

  onCancelButtonClick(): void {
    this.store
      .select(selectUserName)
      .pipe(take(1))
      .subscribe((value) => {
        this.inputName.nativeElement.value = value;
      });
    this.isDisabled = !this.isDisabled;
  }

  onSaveButtonClick(): void {
    const name = this.inputName.nativeElement.value;
    this.store.dispatch(updateUserName({ name }));
    this.isDisabled = !this.isDisabled;
  }
}
