import { createSelector, MemoizedSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { ISearchItem } from '../../youtube/models/search-item.model';

export const selectCustomItems = createSelector(
  (state: AppState) => state.videoItems,
  (state: AppState) => state.videoListIds,
  (videoItems, videoListIds) => videoListIds.map((id) => videoItems[id]).filter((item) => item.custom)
);

export const selectSpecificCustomItem = (id: string): MemoizedSelector<AppState, ISearchItem | undefined> =>
  createSelector(selectCustomItems, (customItems: ISearchItem[]) => customItems.find((item) => item.id.videoId === id));
