import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {MenuItem} from "../../../core/models/restaurant.model";

@Component({
  selector: 'app-nutrituions-modal',
  templateUrl: './nutrituions-modal.component.html',
  styleUrl: './nutrituions-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NutrituionsModalComponent {
  @Input() dish!: MenuItem;
  @Input() id!: string;

}
