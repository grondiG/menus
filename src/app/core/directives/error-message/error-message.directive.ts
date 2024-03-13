import {
  AfterViewInit, ChangeDetectorRef,
  ComponentRef, DestroyRef,
  Directive,
  inject,
  Input,
  ViewContainerRef
} from '@angular/core';
import { ControlContainer, FormGroup, NgForm } from '@angular/forms';
import { ErrorMessageComponent } from '../../components/error-message/error-message.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Directive({
  standalone: true,
  selector: '[appErrorMessage]'
})
export class ErrorMessageDirective implements AfterViewInit {
  private container: ControlContainer = inject(ControlContainer);
  private viewContainerRef: ViewContainerRef = inject(ViewContainerRef);
  private destroy: DestroyRef = inject(DestroyRef);
  private cdr: ChangeDetectorRef = inject(ChangeDetectorRef);

  @Input({ required: true }) set appErrorMessage(value: string) {
    this.control = value;
  }

  private control: string;
  private errComponent!: ComponentRef<ErrorMessageComponent>

  get parentForm(): NgForm {
    return this.container as NgForm;
  }

  get parentFormGroup(): FormGroup {
    return this.container.control as FormGroup;
  }

  ngAfterViewInit(): void {
    this.errComponent = this.viewContainerRef.createComponent(ErrorMessageComponent);

    queueMicrotask(() => this.parentFormGroup.get(this.control).valueChanges.pipe(
      takeUntilDestroyed(this.destroy)
    ).subscribe(() => {
      this.updateErrorMessage();
    }));
  }

  private updateErrorMessage(): void {
    //TODO add condition to show or hide error message
    this.errComponent.instance.errors = this.parentFormGroup.get(this.control).errors;
    this.errComponent.instance.dirty = this.parentForm?.submitted || this.parentFormGroup.get(this.control).dirty || this.parentFormGroup.get(this.control).touched;

    this.cdr.markForCheck();
  }
  //TODO destroy dynamic component
}
