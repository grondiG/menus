import { Pipe, PipeTransform } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';

@Pipe({ name: 'getFormStatusFor' })
export class GetFormStatusForPipe implements PipeTransform {
  transform(form: NgForm, control: NgModel, controlName?: string): boolean {
    return form.submitted || control.dirty || control.touched;
  }
}
