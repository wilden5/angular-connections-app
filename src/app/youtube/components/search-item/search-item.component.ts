import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ISearchItem, IVideoId } from '../../models/search-item.model';

@Component({
  selector: 'app-search-item',
  templateUrl: './search-item.component.html',
  styleUrls: ['./search-item.component.scss'],
})
export class SearchItemComponent {
  @Input() searchItem: ISearchItem | undefined;

  constructor(private router: Router) {}

  onMoreButtonClick(itemId: IVideoId): void {
    this.router.navigate(['/search/item', itemId]);
  }
}
