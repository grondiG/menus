import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { NgClass } from "@angular/common";
import { PreventDefaultDirective } from "../../directives/prevent-default/prevent-default.directive";

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    NgClass,
    FormsModule,
    PreventDefaultDirective
  ]
})
export class FilterComponent {
  @Input() searchValue: string = '';
  @Output() searchValueChange: EventEmitter<string> = new EventEmitter<string>();
  @Output() resetSearchChange: EventEmitter<void> = new EventEmitter<void>();

  onSearch(searchTerm: string): void {
    this.searchValueChange.emit(searchTerm);
  }

  resetSearch(): void {
    this.resetSearchChange.emit();
  }
}
