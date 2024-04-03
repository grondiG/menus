import { inject, Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

export type ErrorTypeKeys = 'required' | 'minlength' | 'banWords' | 'passwordMatch' | 'weakPassword' | 'email' | 'exists';

@Pipe({
  name: 'getErrorInfo'
})
export class GetErrorInfoPipe implements PipeTransform {
  private translate: TranslateService = inject(TranslateService);

  transform(errors: ValidationErrors | null): string | null {
    if (!errors) {
      return null;
    }

    const errorKey: ErrorTypeKeys = Object.keys(errors)[0] as ErrorTypeKeys;
    switch (errorKey) {
      case 'minlength':
        return this.translate.instant("ERROR.INFO.MINLENGTH.TITLE") + " " + errors['minlength']?.requiredLength + ' ' + this.translate.instant("ERROR.INFO.MINLENGTH.SUBTITLE");
      case 'required':
        return this.translate.instant("ERROR.INFO.REQUIRED");
      case 'banWords':
        return this.translate.instant("ERROR.INFO.BANWORDS") + errors['banWords'].join(', ');
      case 'passwordMatch':
        return this.translate.instant("ERROR.INFO.PASSWORDMATCH");
      case 'weakPassword':
        return this.translate.instant("ERROR.INFO.WEAKPASSWORD");
      case 'email':
        return this.translate.instant("ERROR.INFO.EMAIL");
      case 'exists':
        return this.translate.instant("ERROR.INFO.EXISTS");
      default:
        return this.translate.instant("ERROR.INFO.DEFAULT");
    }
  }

}
