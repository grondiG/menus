import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[appBanWords]',
  standalone: true,
  providers: [
    { provide:  NG_VALIDATORS, useExisting: BanWordsValidator, multi: true }
  ],
})
export class BanWordsValidator implements Validator {
  @Input({ required: true }) appBanWords: string[];

  validate(control: AbstractControl): ValidationErrors | null {
    if (!control?.value || typeof control.value !== 'string') {
      return null;
    }

    return this.appBanWords.includes(control.value.toLowerCase())? { 'banWords': this.appBanWords } : null;
  }
}
