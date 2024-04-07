import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-pending',
  templateUrl: './pending.component.html',
  styleUrl: './pending.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PendingComponent {
  @Input() isPending: boolean;
}
