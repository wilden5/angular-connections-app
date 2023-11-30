import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import {
  customPasswordValidationMessages,
  customPasswordValidator,
} from '../../validators/password.validator';
import { ProjectPages } from '../../../../environment/environment';
import { registerNewUser } from '../../../redux/actions/user.actions';
import { IUser } from '../../models/user.model';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent {
  protected readonly customPasswordValidationMessages = customPasswordValidationMessages;

  protected readonly ProjectPages = ProjectPages;

  registrationForm = this.fb.group({
    name: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, customPasswordValidator]],
  });

  constructor(
    private fb: FormBuilder,
    private store: Store
  ) {}

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
    this.store.dispatch(registerNewUser({ user: this.registrationForm.value as IUser }));
  }
}
