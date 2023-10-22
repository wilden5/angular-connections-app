import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent {
  @Output() sortByViewsRequested = new EventEmitter<void>();

  @Output() sortByDateRequested = new EventEmitter<void>();

  @Output() sortByKeyWordRequested = new EventEmitter<string>();

  onSortByViewsButtonClick(): void {
    this.sortByViewsRequested.emit();
  }

  onSortByDateButtonClick(): void {
    this.sortByDateRequested.emit();
  }

  onSortByKeywordInputChange(event: Event): void {
    const searchTerm = (event.target as HTMLInputElement).value;
    this.sortByKeyWordRequested.emit(searchTerm);
  }
}
