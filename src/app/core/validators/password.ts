import { FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

export const passwordValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const password: string = control.value;
  const regex: RegExp = /^(?=.*[A-Z])(?=.*[!@#$%^&.*])(?=.*[0-9]).{8,}$/;
  return password && password.match(regex) ? null : { 'weakPassword': true };
}
