import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { ISearchItem } from '../../youtube/models/search-item.model';

export const selectYoutubeItems = (state: AppState): ISearchItem[] => state.youtubeItem;

export const selectYoutubeItemsSortedByViewsASC = createSelector(selectYoutubeItems, (youtubeItems: ISearchItem[]) => {
  return [...youtubeItems].sort((a, b) => Number(a.statistics.viewCount) - Number(b.statistics.viewCount));
});

export const selectYoutubeItemsSortedByViewsDESC = createSelector(selectYoutubeItems, (youtubeItems: ISearchItem[]) => {
  return [...youtubeItems].sort((a, b) => Number(b.statistics.viewCount) - Number(a.statistics.viewCount));
});

export const selectYoutubeItemsSortedByDateAsc = createSelector(selectYoutubeItems, (youtubeItems: ISearchItem[]) => {
  return [...youtubeItems].sort(
    (a, b) => new Date(a.snippet.publishedAt).getTime() - new Date(b.snippet.publishedAt).getTime()
  );
});

export const selectYoutubeItemsSortedByDateDesc = createSelector(selectYoutubeItems, (youtubeItems: ISearchItem[]) => {
  return [...youtubeItems].sort(
    (a, b) => new Date(b.snippet.publishedAt).getTime() - new Date(a.snippet.publishedAt).getTime()
  );
});
