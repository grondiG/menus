import { Pipe, PipeTransform } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Pipe({
  name: 'formInputError',
  pure: false
})
export class FormInputErrorPipe implements PipeTransform {

  transform(control: AbstractControl | null): boolean {
    if(control){
      return control.invalid && control.touched;
    }
    return false;
  }
}
