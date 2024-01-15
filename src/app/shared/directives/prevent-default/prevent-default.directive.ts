import {Directive, HostListener} from '@angular/core';

@Directive({
  selector: '[appPreventDefault]'
})
export class PreventDefaultDirective {
  @HostListener('submit', ['$event'])
  onSubmit(event: Event) {
    event.preventDefault();
  }

  constructor() { }

}
