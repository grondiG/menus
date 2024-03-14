import {
  AfterViewInit,
  ComponentRef,
  DestroyRef,
  Directive,
  ElementRef,
  inject,
  OnDestroy,
  ViewContainerRef
} from '@angular/core';
import { ControlContainer, FormControlStatus, NgControl, NgForm } from '@angular/forms';
import { ErrorMessageComponent } from '../../components/error-message/error-message.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PendingComponent } from '../../components/pending/pending.component';
import { fromEvent, map, merge, Observable, skip, startWith } from 'rxjs';

@Directive({
  standalone: true,
  selector: '[appErrorMessage]'
})
export class ErrorMessageDirective implements AfterViewInit, OnDestroy {
  private container: ControlContainer = inject(ControlContainer);
  private viewContainerRef: ViewContainerRef = inject(ViewContainerRef);
  private destroy: DestroyRef = inject(DestroyRef);
  private ngControl: NgControl = inject(NgControl, { self: true });
  elementRef: ElementRef = inject(ElementRef);

  private errComponent!: ComponentRef<ErrorMessageComponent>
  private pendingComponent!: ComponentRef<PendingComponent>;

  get parentForm(): NgForm {
    return this.container as NgForm;
  }

  get ngForm(): NgForm | null {
    return (this.container?.formDirective || null) as NgForm | null;
  }

  submitted$: Observable<boolean> = this.ngForm?.ngSubmit.pipe(
    map(() => true),
    startWith(false),
    skip(1),
    takeUntilDestroyed(this.destroy)
  );

  controlChanges$: Observable<FormControlStatus> = this.ngControl?.control.statusChanges.pipe(
    skip(1),
    takeUntilDestroyed(this.destroy)
  )

  controlTouched$: Observable<unknown> = fromEvent(this.elementRef.nativeElement, 'blur').pipe(
    takeUntilDestroyed(this.destroy)
  );

  ngAfterViewInit(): void {
    if (!this.ngControl?.control) {
      throw Error(`No control model for ${this.ngControl?.name} control...`);
    }
    this.errComponent = this.viewContainerRef.createComponent(ErrorMessageComponent);

    queueMicrotask(() =>
      merge(this.submitted$, this.controlChanges$, this.controlTouched$
      ).subscribe(() => {
        this.updateErrorMessage();
        if(this.ngControl.pending){
          this.updatePending();
        }
      })
    );
  }


  private updateErrorMessage(): void {
    this.errComponent.setInput('errors', this.ngControl.errors);
    this.errComponent.setInput('dirty', this.parentForm?.submitted || this.ngControl.dirty || this.ngControl.touched);
    if(!!this.pendingComponent){
      this.pendingComponent.setInput('isPending', false);
    }
  }

  private updatePending(): void {
      if (!this.pendingComponent) {
        this.pendingComponent = this.viewContainerRef.createComponent(PendingComponent);
      }
      this.pendingComponent.setInput('isPending', this.ngControl.pending);
  }

  ngOnDestroy() {
    this.errComponent.destroy();
    if(this.pendingComponent){
      this.pendingComponent.destroy();
    }
  }
}
