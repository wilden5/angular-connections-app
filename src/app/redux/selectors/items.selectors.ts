import { createSelector, MemoizedSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { ISearchItem } from '../../youtube/models/search-item.model';

export const selectYoutubeItems = (state: AppState): ISearchItem[] => state.youtubeItems;

export const selectCustomItems = (state: AppState): ISearchItem[] => state.customItems;

export const selectAllItems = createSelector(selectYoutubeItems, selectCustomItems, (youtubeItems, customItems) => [
  ...customItems,
  ...youtubeItems,
]);

export const selectSpecificCustomItem = (id: string): MemoizedSelector<AppState, ISearchItem | undefined> =>
  createSelector(selectCustomItems, (customItems: ISearchItem[]) => customItems.find((item) => item.id.videoId === id));
