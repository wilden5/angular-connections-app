import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ISearchItem, IVideoId } from '../../models/search-item.model';
import { AppState } from '../../../redux/app.state';
import { deleteCustomItem } from '../../../redux/actions/custom-item.actions';
import { addYoutubeItemToFavoriteList } from '../../../redux/actions/youtube-items.actions';

@Component({
  selector: 'app-search-item',
  templateUrl: './search-item.component.html',
  styleUrls: ['./search-item.component.scss'],
})
export class SearchItemComponent {
  @Input() searchItem: ISearchItem | undefined;

  constructor(
    private router: Router,
    private store: Store<AppState>
  ) {}

  onMoreButtonClick(itemId: string | IVideoId): void {
    if (typeof itemId === 'string') {
      this.router.navigate(['/search/item', itemId]);
    } else if (typeof itemId === 'object') {
      this.router.navigate(['/search/item', itemId.videoId]);
    }
  }

  onDeleteButtonClick(customItemId: string): void {
    this.store.dispatch(deleteCustomItem({ id: customItemId }));
  }

  onAddToFavoriteButtonClick(customItemId: IVideoId): void {
    this.store.dispatch(addYoutubeItemToFavoriteList({ id: String(customItemId) }));
  }
}
