import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { ISearchItem } from '../../youtube/models/search-item.model';

export const selectVideoItems = (state: AppState): { [id: string]: ISearchItem } => state.videoItems;

export const selectVideoListIds = (state: AppState): string[] => state.videoListIds;

export const selectAllItems = createSelector(selectVideoItems, selectVideoListIds, (videoItems, videoListIds) =>
  videoListIds ? videoListIds.map((id) => videoItems[id]) : []
);
