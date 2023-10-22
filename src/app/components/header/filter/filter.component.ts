import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent {
  @Output() sortByViews = new EventEmitter<void>();

  @Output() sortByDate = new EventEmitter<void>();

  onSortByViews(): void {
    this.sortByViews.emit();
  }

  onSortByDate(): void {
    this.sortByDate.emit();
  }
}
