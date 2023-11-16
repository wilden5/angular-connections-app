import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../app.state';

export const selectAppState = createFeatureSelector<AppState>('appState');

export const selectVideoItems = createSelector(selectAppState, (state) => state.videoItems);

const selectVideoListIds = createSelector(selectAppState, (state) => state.videoListIds);

const selectCustomItems = createSelector(selectAppState, (state) => state.customItems);

export const selectAllItems = createSelector(
  selectVideoItems,
  selectVideoListIds,
  selectCustomItems,
  (videoItems, videoListIds, customItems) => {
    const allItems = Object.values(customItems);

    videoListIds.forEach((id) => {
      if (videoItems[id]) {
        allItems.push(videoItems[id]);
      }
    });
    return allItems;
  }
);
