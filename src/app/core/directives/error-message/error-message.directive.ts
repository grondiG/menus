import { AfterViewInit, Directive, ElementRef, inject, Input, Renderer2 } from '@angular/core';
import { ControlContainer, FormGroup, NgControl, NgForm } from '@angular/forms';

@Directive({
  standalone: true,
  selector: '[appErrorMessage]'
})
export class ErrorMessageDirective implements AfterViewInit {
  @Input() control: NgControl;
  private container: ControlContainer = inject(ControlContainer);
  private errorElement!: unknown;

  get parentForm(): NgForm {
    return this.container as NgForm;
  }

  constructor(private el: ElementRef, private renderer: Renderer2) {
    //TODO:
    // change to factory
    // const factory = this.componentFactoryResolver.resolveComponentFactory(LoginComponent);
    // const component: ComponentRef<LoginComponent> = this.viewContainerRef.createComponent(factory);
    // component.instance.user = "prop 1";
    // component.instance.input2 = "prop 2";
    this.errorElement = this.renderer.createElement('app-error-message');
    const factory =
    // this.renderer.setProperty()
    this.renderer.addClass(this.errorElement , 'alert'); // Add any necessary classes
    this.renderer.addClass(this.errorElement , 'alert-danger'); // Customize styling

    // Set the error message content (you can customize this)
    this.renderer.setProperty(this.errorElement , 'innerText', 'This field is required.');

    // Append the error message component below the input
    this.renderer.appendChild(this.el.nativeElement.parentNode, this.errorElement );
  }

  ngAfterViewInit(): void {

  }

}
