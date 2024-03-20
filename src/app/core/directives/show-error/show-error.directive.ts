import { DestroyRef, Directive, ElementRef, inject, OnInit } from '@angular/core';
import { ControlContainer, NgControl, NgForm } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { fromEvent, map, skip, startWith } from 'rxjs';

@Directive({
  // selector: [ngModel]:not([withoutValidationErrors]), // 3
  // selector: '[appShowError],[ngModel]', // 2
  selector: '[appShowError]', // 1
  standalone: true
})
export class ShowErrorDirective implements OnInit {
  container: ControlContainer = inject(ControlContainer);
  ngControl: NgControl = inject(NgControl, { self: true });
  elementRef: ElementRef = inject(ElementRef);
  destroy: DestroyRef = inject(DestroyRef);

  get ngForm(): NgForm | null {
    return (this.container?.formDirective || null) as NgForm | null;
  }

  submitted$ = this.ngForm?.ngSubmit?.pipe(
    map(() => true),
    startWith(false),
    skip(1),
    takeUntilDestroyed(this.destroy)
  );

  controlChanges$ = this.ngControl?.control.valueChanges?.pipe(
    skip(1),
    takeUntilDestroyed(this.destroy)
  )

  controlTouched$ = fromEvent(this.elementRef?.nativeElement, 'blur')?.pipe(
    takeUntilDestroyed(this.destroy)
  );

  ngOnInit() {
    if (!this.ngControl || !this.ngControl.control || !this.elementRef.nativeElement) {
      throw new Error(`No control model or element for ${this.ngControl?.name || 'unknown'} control...`);
    }

    this.controlTouched$.subscribe(() => {
      console.log(this.ngControl.errors);

      console.log('touched')
    });
    this.submitted$.subscribe(() => {
      console.log(this.ngControl.errors);

      console.log('submit')
    });
    this.controlChanges$.subscribe(() => {
      console.log(this.ngControl.errors);

      console.log('changes')
    })
  }
}
