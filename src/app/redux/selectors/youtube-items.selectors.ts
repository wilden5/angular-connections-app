import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { ISearchItem } from '../../youtube/models/search-item.model';

export const selectAppState = createFeatureSelector<AppState>('appState');

export const selectVideoItems = createSelector(selectAppState, (state) => state.videoItems);

export const selectFavoriteListIds = createSelector(selectAppState, (state) => state.favoriteListIds);

export const selectYoutubeItemsSortedByViewsASC = createSelector(selectVideoItems, (state) => {
  const values = Object.values(state);
  return [...values].sort((a, b) => Number(a.statistics.viewCount) - Number(b.statistics.viewCount));
});

export const selectYoutubeItemsSortedByViewsDESC = createSelector(selectVideoItems, (state) => {
  const values = Object.values(state);
  return [...values].sort((a, b) => Number(b.statistics.viewCount) - Number(a.statistics.viewCount));
});

export const selectYoutubeItemsSortedByDateAsc = createSelector(selectVideoItems, (state) => {
  const values = Object.values(state);
  return [...values].sort(
    (a, b) => new Date(a.snippet.publishedAt).getTime() - new Date(b.snippet.publishedAt).getTime()
  );
});

export const selectYoutubeItemsSortedByDateDesc = createSelector(selectVideoItems, (state) => {
  const values = Object.values(state);
  return [...values].sort(
    (a, b) => new Date(b.snippet.publishedAt).getTime() - new Date(a.snippet.publishedAt).getTime()
  );
});

export const selectSpecificYoutubeItem = (id: string): MemoizedSelector<AppState, ISearchItem | undefined> =>
  createSelector(selectVideoItems, (state): ISearchItem | undefined => state[id]);

export const selectFavoriteItems = createSelector(selectVideoItems, selectFavoriteListIds, (state, ids) => {
  const values = Object.values(state);
  return [...values].filter((item) => ids.includes(String(item.id)));
});
