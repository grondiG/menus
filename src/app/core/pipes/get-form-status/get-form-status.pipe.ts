import { Pipe, PipeTransform } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';

@Pipe({
  name: 'getFormStatus',
  pure: false
  //TODO: fix this
})
export class GetFormStatusPipe implements PipeTransform {
  transform(form: NgForm, control: NgModel): boolean {
    console.log(control)
    return form.submitted || control.dirty || control.touched;
  }
}
