import { Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

export type ErrorTypeKeys = 'required' | 'minlength' | 'banWords' | 'passwordMatch' | 'weakPassword' | 'email' | 'exists';

@Pipe({
  name: 'getErrorInfo'
})
export class GetErrorInfoPipe implements PipeTransform {

  transform(errors: ValidationErrors | null): string | null {
    if (!errors) {
      return null;
    }

    const errorKey: ErrorTypeKeys = Object.keys(errors)[0] as ErrorTypeKeys;
    switch (errorKey) {
      case 'minlength':
        return 'Please provide more then ' + errors['minlength']?.requiredLength + ' characters';
      case 'required':
        return 'Input is required';
      case 'banWords':
        return 'Please do not use ban word. List of forbidden words: ' + errors['banWords'].join(', ');
      case 'passwordMatch':
        return 'Password do not match';
      case 'weakPassword':
        return 'Password is too weak';
      case 'email':
        return 'Invalid email';
      case 'exists':
        return 'This name already exists';
      default:
        return 'Error on input';
    }

    // if (control.hasError('required')) {
    //   return this.capitalizeFirstLetter(control.name as string) +' is required';
    // }
    //
    // if (control.hasError('minlength')) {
    //   return 'Please provide more then ' + control.getError('minlength')?.requiredLength + ' characters';
    // }
    //
    // if (control.hasError('email')) {
    //   return 'Invalid email';
    // }
    //
    // if (control.hasError('banWords')) {
    //   return 'Please do not use ban word. List of forbidden words: ' + control.getError('banWords').join(', ');
    // }
    //
    // if (control.hasError('passwordMatch')) {
    //   return 'Password do not match';
    // }
    //
    // if (control.hasError('weakPassword')) {
    //   return 'Password is too weak';
    // }

    // return '';
  }

}
