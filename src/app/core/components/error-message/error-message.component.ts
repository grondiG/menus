import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NgModel, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-error-message',
  templateUrl: 'error-message.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ErrorMessageComponent{
  @Input() dirty: boolean;
  @Input() errors: ValidationErrors | null;
  // TODO remove
  @Input() control: NgModel | null;
}
