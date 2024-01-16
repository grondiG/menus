import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
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
