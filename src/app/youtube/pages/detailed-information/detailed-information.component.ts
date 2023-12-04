import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { map, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { ISearchItem, IVideoId } from '../../models/search-item.model';
import { AppState } from '../../../redux/app.state';
import { selectSpecificCustomItem } from '../../../redux/selectors/custom-items.selectors';
import { selectFavoriteListIds, selectSpecificYoutubeItem } from '../../../redux/selectors/youtube-items.selectors';
import { deleteCustomItem } from '../../../redux/actions/custom-item.actions';
import { addYoutubeItemToFavoriteList } from '../../../redux/actions/youtube-items.actions';

@Component({
  selector: 'app-detailed-information',
  templateUrl: './detailed-information.component.html',
  styleUrls: ['./detailed-information.component.scss'],
})
export class DetailedInformationComponent implements OnInit {
  @Input() searchItem$: Observable<ISearchItem | undefined> | undefined;

  favoriteListIds$: Observable<string[]>;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private store: Store<AppState>
  ) {
    this.favoriteListIds$ = this.store.select(selectFavoriteListIds);
  }

  ngOnInit(): void {
    const itemId = this.route.snapshot.paramMap.get('id');
    if (itemId && itemId.startsWith('cv')) {
      this.searchItem$ = this.store.select(selectSpecificCustomItem(itemId));
    } else if (itemId) {
      this.searchItem$ = this.store.select(selectSpecificYoutubeItem(itemId));
    }
  }

  onBackButtonClick(): void {
    this.location.back();
  }

  onDeleteButtonClick(customItemId: string): void {
    this.store.dispatch(deleteCustomItem({ id: customItemId }));
    this.location.back();
  }

  onToggleFavoriteStatusButtonClick(itemId: IVideoId): void {
    this.store.dispatch(addYoutubeItemToFavoriteList({ id: String(itemId) }));
  }

  isFavoriteItem(id: IVideoId): Observable<boolean> {
    return this.favoriteListIds$.pipe(map((favoriteListIds) => favoriteListIds.includes(String(id))));
  }
}
