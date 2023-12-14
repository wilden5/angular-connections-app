import { ChangeDetectionStrategy, Component, DestroyRef } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  displayPasswordValidationMessage,
  customPasswordValidator,
} from '../../validators/password.validator';
import { projectConstants, ProjectPages } from '../../../../environment/environment';
import { registerNewUser } from '../../state/user.actions';
import { IUserRegistration } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { startLoading } from '../../../redux/actions/spinner.actions';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationComponent {
  protected readonly customPasswordValidationMessages = displayPasswordValidationMessage;

  protected readonly ProjectPages = ProjectPages;

  registrationForm = this.fb.group({
    name: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$'), Validators.maxLength(40)]],
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
    this.store.dispatch(startLoading());
    this.store.dispatch(
      registerNewUser({ user: this.registrationForm.value as IUserRegistration })
    );
  }

  displayNameValidationMessage(): string {
    switch (true) {
      case this.name.hasError('required'):
        return projectConstants.formFieldRequired;
      case this.name.hasError('maxlength'):
        return projectConstants.formNameLength;
      default:
        return projectConstants.formNameRegex;
    }
  }

  displayEmailValidationMessage(): string {
    if (this.email.hasError('required')) {
      return projectConstants.formFieldRequired;
    }
    return projectConstants.formEmail;
  }
}
