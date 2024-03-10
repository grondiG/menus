import { Pipe, PipeTransform } from '@angular/core';
import { ModelFormGroup } from '../../types/form';
import { RegisterData } from '../../models/authentication';

@Pipe({
  standalone: true,
  name: 'checkIfInputIsValid'
})
export class CheckIfInputIsValidPipe implements PipeTransform {

  transform(inputName: string, registerData: ModelFormGroup<RegisterData>): boolean {
    const control = registerData.get(inputName);
    if (!control) {
      return false;
    }

    if (inputName === 'confirmPassword' && control.touched) {
      return registerData.hasError('passwordMismatch');
    }

    return control.invalid && control.touched;
  }

}
