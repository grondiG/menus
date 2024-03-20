import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MenuItem } from '../../models/restaurant.model';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-nutrituions-modal',
  templateUrl: './nutrituions-modal.component.html',
  styleUrl: './nutrituions-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgIf
  ],
  standalone: true
})
export class NutrituionsModalComponent {
  @Input() dish!: MenuItem;
  @Input() id!: string;

}
