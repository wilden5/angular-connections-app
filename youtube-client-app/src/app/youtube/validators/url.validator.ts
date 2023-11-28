import { AbstractControl, ValidationErrors } from '@angular/forms';

export function customURLValidator(control: AbstractControl): ValidationErrors | null {
  try {
    const url = new URL(control.value);
    return null;
  } catch (err) {
    return { invalidUrl: true };
  }
}
