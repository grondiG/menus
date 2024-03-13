import {
  AfterViewInit,
  ComponentRef, DestroyRef,
  Directive,
  inject,
  Input, OnDestroy,
  ViewContainerRef
} from '@angular/core';
import { AbstractControl, ControlContainer, FormGroup, NgForm } from '@angular/forms';
import { ErrorMessageComponent } from '../../components/error-message/error-message.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PendingComponent } from '../../components/pending/pending.component';

@Directive({
  standalone: true,
  selector: '[appErrorMessage]'
})
export class ErrorMessageDirective implements AfterViewInit, OnDestroy {
  private container: ControlContainer = inject(ControlContainer);
  private viewContainerRef: ViewContainerRef = inject(ViewContainerRef);
  private destroy: DestroyRef = inject(DestroyRef);

  @Input({ required: true }) set appErrorMessage(value: string) {
    this.control = value;
  }

  private control: string;
  private errComponent!: ComponentRef<ErrorMessageComponent>
  private pendingComponent!: ComponentRef<PendingComponent>;

  get parentForm(): NgForm {
    return this.container as NgForm;
  }

  get parentFormGroup(): FormGroup {
    return this.container.control as FormGroup;
  }

  ngAfterViewInit(): void {
    this.errComponent = this.viewContainerRef.createComponent(ErrorMessageComponent);

    queueMicrotask(() => this.parentFormGroup.get(this.control).statusChanges.pipe(
      takeUntilDestroyed(this.destroy)
    ).subscribe(() => {
      this.updateErrorMessage();
      if(this.parentFormGroup.get(this.control).pending){
        this.updatePending();
      }
    }));
  }

  private updateErrorMessage(): void {
    const inputControl: AbstractControl = this.parentFormGroup.get(this.control);
    this.errComponent.setInput('errors', inputControl.errors);
    this.errComponent.setInput('dirty', this.parentForm?.submitted || inputControl.dirty || inputControl.touched);
    if(!!this.pendingComponent){
      this.pendingComponent.setInput('isPending', false);
    }
  }

  private updatePending(): void {
    const inputControl: AbstractControl = this.parentFormGroup.get(this.control);
      if (!this.pendingComponent) {
        this.pendingComponent = this.viewContainerRef.createComponent(PendingComponent);
      }
      this.pendingComponent.setInput('isPending', inputControl.pending);
  }

  ngOnDestroy() {
    this.errComponent.destroy();
    if(this.pendingComponent){
      this.pendingComponent.destroy();
    }
  }
}
