import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[appStrongPassword]',
  standalone: true,
  providers: [
    { provide: NG_VALIDATORS, useExisting: StrongPasswordDirective, multi: true }
  ]
})
export class StrongPasswordDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors | null{
    const password: string = control.value;
    const regex: RegExp = /^(?=.*[A-Z])(?=.*[!@#$%^&.*])(?=.*[0-9]).{8,}$/;
    return password && password.match(regex) ? null : { 'weakPassword': true };
  }
}
