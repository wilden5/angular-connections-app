import { ChangeDetectionStrategy, Component, DestroyRef } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  customPasswordValidationMessages,
  customPasswordValidator,
} from '../../validators/password.validator';
import { ProjectPages } from '../../../../environment/environment';
import { registerNewUser } from '../../../redux/actions/user.actions';
import { IUser } from '../../models/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationComponent {
  protected readonly customPasswordValidationMessages = customPasswordValidationMessages;

  protected readonly ProjectPages = ProjectPages;

  registrationForm = this.fb.group({
    name: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
    // todo: implement maxLength 40 (as for profile page)
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, customPasswordValidator]],
  });

  constructor(
    private fb: FormBuilder,
    private store: Store,
    protected userService: UserService,
    private destroyRef: DestroyRef
  ) {
    this.email.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.userService.isExceptionSubject.next(false));
  }

  get name(): AbstractControl {
    return this.registrationForm.get('name')!;
  }

  get email(): AbstractControl {
    return this.registrationForm.get('email')!;
  }

  get password(): AbstractControl {
    return this.registrationForm.get('password')!;
  }

  onSubmitRegistrationForm(): void {
    this.userService.isExceptionSubject.next(true);
    this.store.dispatch(registerNewUser({ user: this.registrationForm.value as IUser }));
  }
}
