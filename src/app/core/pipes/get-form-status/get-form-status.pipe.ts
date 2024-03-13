import { Pipe, PipeTransform } from '@angular/core';
import { FormControl, NgForm, NgModel } from '@angular/forms';

@Pipe({ name: 'getFormStatusFor' })
export class GetFormStatusForPipe implements PipeTransform {
  transform(form: NgForm, control: NgModel, controlName?: string): boolean {
    const submitted: boolean = form.submitted;
    const formControl: FormControl|undefined = form.control.get(controlName) as FormControl;

    return form.submitted || control.dirty || control.touched;
  }
}
