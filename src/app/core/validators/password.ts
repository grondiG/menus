import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";

export const passwordValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const password: AbstractControl<any,any> = control.get('password');
  const regex: RegExp = /^(?=.*[A-Z])(?=.*[!@#$%^&.*])(?=.*[0-9]).{8,}$/;
  return password && password.value.match(regex) ? null : { 'passwordMismatch': true };
}
