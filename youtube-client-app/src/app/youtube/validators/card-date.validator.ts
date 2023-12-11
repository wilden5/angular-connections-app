import { AbstractControl, ValidationErrors } from '@angular/forms';

export function customCardDateValidator(control: AbstractControl): ValidationErrors | null {
  const today = new Date().getTime();
  const controlDate = new Date(control.value).getTime();

  if (controlDate > today) {
    return { futureDate: true };
  }
  return null;
}
