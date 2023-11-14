import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { ISearchItem } from '../../youtube/models/search-item.model';

export const selectYoutubeItems = (state: AppState): ISearchItem[] => state.youtubeItems;

export const selectCustomItems = (state: AppState): ISearchItem[] => state.customItems;

export const selectAllItems = createSelector(selectYoutubeItems, selectCustomItems, (youtubeItems, customItems) => [
  ...customItems,
  ...youtubeItems,
]);
