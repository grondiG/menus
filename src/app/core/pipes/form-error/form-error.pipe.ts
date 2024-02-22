import { Pipe, PipeTransform } from '@angular/core';
import { ModelFormGroup } from '../../types/form';
import { RegisterData } from '../../models/authentication';

@Pipe({
  name: 'formError',
  pure: false
})
export class FormErrorPipe implements PipeTransform {

  transform(form: ModelFormGroup<RegisterData>): boolean {
    if(form.controls['confirmPassword'].dirty){
      return form.hasError('passwordMismatch');
    }
    return false;
  }
}
