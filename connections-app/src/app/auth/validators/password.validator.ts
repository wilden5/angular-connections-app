import { AbstractControl, ValidationErrors } from '@angular/forms';

export function customPasswordValidator(control: AbstractControl): ValidationErrors | null {
  const { value } = control;

  if (value.length < 8) {
    return { hasLength: true };
  }

  if (!/^(?=.*[A-Z]).+$/.test(value)) {
    return { hasUpperCaseLetter: true };
  }

  if (!/^(?=.*\d).+$/.test(value)) {
    return { hasDigit: true };
  }

  if (!/^(?=.*[^A-Za-z0-9]).+$/.test(value)) {
    return { hasSpecialCharacter: true };
  }
  return null;
}

export function customPasswordValidationMessages(passwordField: AbstractControl): string {
  if (passwordField.hasError('required')) {
    return 'Password field is required';
  }

  if (passwordField.hasError('hasLength')) {
    return 'at least 8 characters';
  }

  if (passwordField.hasError('hasDigit')) {
    return 'at least 1 digit';
  }

  if (passwordField.hasError('hasUpperCaseLetter')) {
    return 'at least 1 upper case letter';
  }

  if (passwordField.hasError('hasSpecialCharacter')) {
    return 'at least one special character';
  }

  return '';
}
