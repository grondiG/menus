import { Pipe, PipeTransform } from '@angular/core';
import { NgControl } from '@angular/forms';

@Pipe({
  name: 'getErrorInfo',
  pure: false
})
export class GetErrorInfoPipe implements PipeTransform {

  capitalizeFirstLetter(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  transform(control: NgControl): unknown {
    if (!control) {
      return '';
    }

    if (control.hasError('required')) {
      return this.capitalizeFirstLetter(control.name as string) +' is required';
    }

    if (control.hasError('minlength')) {
      return 'Please provide more then ' + control.getError('minlength')?.requiredLength + ' characters';
    }

    if (control.hasError('email')) {
      return 'Invalid email';
    }

    if (control.hasError('banWords')) {
      return 'Please do not use ban word. List of forbidden words: ' + control.getError('banWords').join(', ');
    }

    if (control.hasError('passwordMatch')) {
      return 'Password do not match';
    }

    if (control.hasError('weakPassword')) {
      return 'Password is too weak';
    }

    return '';
  }

}
