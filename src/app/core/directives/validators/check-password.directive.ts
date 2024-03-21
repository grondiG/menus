import { AfterViewInit, DestroyRef, Directive, inject, Input } from '@angular/core';
import {
  AbstractControl,
  ControlContainer,
  FormGroup,
  NG_VALIDATORS,
  ValidationErrors,
  Validator
} from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Directive({
  selector: '[appCheckPassword]',
  standalone: true,
  providers: [
    { provide: NG_VALIDATORS, useExisting: CheckPasswordValidator, multi: true }
  ]
})
export class CheckPasswordValidator implements Validator, AfterViewInit {
  private container: ControlContainer = inject(ControlContainer);
  private destroy: DestroyRef = inject(DestroyRef);

  @Input({ required: true }) set appCheckPassword(value: string) {
    this.passwordControl = value;
  }

  private passwordControl: string;
  private change: () => void = () => {};

  get parentForm(): FormGroup {
    return this.container.control as FormGroup;
  }

  ngAfterViewInit(): void {
    // We should wait for form to be initialized
    queueMicrotask(() => this.parentForm.get(this.passwordControl).valueChanges.pipe(
      takeUntilDestroyed(this.destroy)
    ).subscribe(() => {
      this.change();
    }));
  }

  registerOnValidatorChange(fn: () => void): void {
    this.change = fn;
  }

  validate(control: AbstractControl): ValidationErrors | null {
    if (!control?.value) {
      return null;
    }

    const password: string = this.parentForm?.get(this.passwordControl)?.value;

    return control.value === password ? null : { passwordMatch: true };
  }
}
