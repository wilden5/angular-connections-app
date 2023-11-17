import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectFavoriteItems } from '../../../redux/selectors/youtube-items.selectors';
import { AppState } from '../../../redux/app.state';
import { ISearchItem } from '../../../youtube/models/search-item.model';

@Component({
  selector: 'app-favorite-page',
  templateUrl: './favorite-page.component.html',
  styleUrls: ['./favorite-page.component.scss'],
})
export class FavoritePageComponent {
  protected readonly selectFavoriteYoutubeItems = selectFavoriteItems;

  @Input() searchItem: ISearchItem | undefined;

  constructor(protected store: Store<AppState>) {}
}
