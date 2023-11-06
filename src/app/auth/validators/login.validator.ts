import { AbstractControl, ValidationErrors } from '@angular/forms';

export function customPasswordValidator(control: AbstractControl): ValidationErrors | null {
  const { value } = control;

  if (value.length < 8) {
    return { hasLength: true };
  }

  if (!/^(?=.*[a-z]).+$/.test(value)) {
    return { hasLowerCaseLetter: true };
  }

  if (!/^(?=.*[A-Z]).+$/.test(value)) {
    return { hasUpperCaseLetter: true };
  }

  if (!/^(?=.*[a-zA-Z]).+$/.test(value)) {
    return { hasAnyLetter: true };
  }

  if (!/^(?=.*\d).+$/.test(value)) {
    return { hasDigit: true };
  }

  if (!/^(?=.*[^A-Za-z0-9]).+$/.test(value)) {
    return { hasSpecialCharacter: true };
  }
  return null;
}
