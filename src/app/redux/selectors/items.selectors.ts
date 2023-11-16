import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../app.state';

export const selectAppState = createFeatureSelector<AppState>('appState');

export const selectVideoItems = createSelector(selectAppState, (state) => state.videoItems);

const selectVideoListIds = createSelector(selectAppState, (state) => state.videoListIds);

export const selectAllItems = createSelector(selectVideoItems, selectVideoListIds, (videoItems, videoListIds) =>
  videoListIds.map((id) => videoItems[id])
);
