import { ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { take } from 'rxjs';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { loadProfile, logoutUser, updateUserName } from '../../state/user.actions';
import { selectUser, selectUserName } from '../../state/user.selectors';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent implements OnInit {
  @ViewChild('inputName') inputName!: ElementRef;

  protected readonly selectUser = selectUser;

  profileForm = this.fb.group({
    name: [
      { value: '', disabled: true },
      [Validators.required, Validators.pattern('^[a-zA-Z ]+$')],
    ],
  });

  constructor(
    protected store: Store,
    private fb: FormBuilder,
    protected userService: UserService
  ) {}

  get name(): AbstractControl {
    return this.profileForm.get('name')!;
  }

  ngOnInit(): void {
    this.store.dispatch(loadProfile());
    this.store
      .select(selectUserName)
      .pipe(take(1))
      .subscribe((name) => {
        if (name) {
          this.profileForm.patchValue({
            name,
          });
        }
      });
  }

  onEditButtonClick(): void {
    this.profileForm.patchValue({
      name: this.inputName.nativeElement.value,
    });
    this.profileForm.get('name')?.enable();
  }

  onCancelButtonClick(): void {
    this.store
      .select(selectUserName)
      .pipe(take(1))
      .subscribe((value) => {
        this.inputName.nativeElement.value = value;
      });
    this.profileForm.get('name')?.disable();
  }

  onSaveButtonClick(): void {
    const name = this.inputName.nativeElement.value;
    this.store.dispatch(updateUserName({ name }));
    this.profileForm.get('name')?.disable();
  }

  onLogoutButtonClick(): void {
    this.store.dispatch(logoutUser());
  }
}
