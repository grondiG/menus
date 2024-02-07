import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: 'app-error-card',
  templateUrl: './error-card.component.html',
  styleUrl: './error-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ErrorCardComponent {
  @Input() error: HttpErrorResponse;
}
