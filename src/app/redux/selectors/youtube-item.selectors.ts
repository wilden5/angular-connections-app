import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { ISearchItem } from '../../youtube/models/search-item.model';

export const selectYoutubeItem = (state: AppState): ISearchItem[] => state.youtubeItem;

export const selectYoutubeItemSortedByViews = createSelector(selectYoutubeItem, (youtubeItem: ISearchItem[]) => {
  return [...youtubeItem].sort((a, b) => Number(a.statistics.viewCount) - Number(b.statistics.viewCount));
});
