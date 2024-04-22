import { FormControl, FormGroup } from '@angular/forms';

export type ModelFormGroup<T> = FormGroup<{
  [K in keyof T]: FormControl<T[K]>;
}>;

/**
 * create FormGroup interface with FormControls only based on provided interface
 */
export type BasedOn<T> = {
  [K in keyof T]-?: FormControl<T[K]>
}
