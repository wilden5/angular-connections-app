import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { ISearchItem, IVideoId } from '../../models/search-item.model';
import { AppState } from '../../../redux/app.state';
import { deleteCustomItem } from '../../../redux/actions/custom-item.actions';
import { addYoutubeItemToFavoriteList } from '../../../redux/actions/youtube-items.actions';
import { selectFavoriteListIds } from '../../../redux/selectors/youtube-items.selectors';
import { ProjectPath } from '../../../utils/project-constants';

@Component({
  selector: 'app-search-item',
  templateUrl: './search-item.component.html',
  styleUrls: ['./search-item.component.scss'],
})
export class SearchItemComponent {
  @Input() searchItem: ISearchItem | undefined;

  favoriteListIds$: Observable<string[]>;

  constructor(
    private router: Router,
    private store: Store<AppState>
  ) {
    this.favoriteListIds$ = this.store.select(selectFavoriteListIds);
  }

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

  onToggleFavoriteStatusButtonClick(itemId: IVideoId): void {
    this.store.dispatch(addYoutubeItemToFavoriteList({ id: String(itemId) }));
  }

  isFavoriteItem(id: IVideoId): Observable<boolean> {
    return this.favoriteListIds$.pipe(map((favoriteListIds) => favoriteListIds.includes(String(id))));
  }
}
