import { ChangeDetectorRef, Directive, inject } from '@angular/core';
import { AbstractControl, AsyncValidator, NG_ASYNC_VALIDATORS, ValidationErrors } from '@angular/forms';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  finalize,
  first,
  map,
  Observable,
  of,
  switchMap
} from 'rxjs';
import { UserService } from '../../services/profile/user.service';

@Directive({
  selector: '[appCheckNames]',
  standalone: true,
  providers: [
    { provide: NG_ASYNC_VALIDATORS, useExisting: CheckNamesValidator, multi: true }
  ]
})
export class CheckNamesValidator implements AsyncValidator {
  private userService: UserService = inject(UserService);
  private cd: ChangeDetectorRef = inject(ChangeDetectorRef);

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    if (!control?.value || typeof control.value !== 'string') {
      return of(null);
    }

    const valueChanges = control.valueChanges;

    if (!valueChanges || typeof valueChanges.pipe !== 'function') {
      return of(null);
    }

    return valueChanges.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      switchMap(() => this.userService.checkName(control.value)),
      map((response) => response.exists ? { exists: true } : null),
      catchError(() => of({ errorOnCheck: true })),
      finalize(() => this.cd.markForCheck()),
      first()
    );
  }
}
