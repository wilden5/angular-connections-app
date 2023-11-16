import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { ISearchItem } from '../../youtube/models/search-item.model';

export const selectAppState = createFeatureSelector<AppState>('appState');

export const selectVideoItems = createSelector(selectAppState, (state) => state.videoItems);

export const selectSpecificCustomItem = (id: string): MemoizedSelector<AppState, ISearchItem | undefined> =>
  createSelector(selectVideoItems, (state): ISearchItem | undefined => state[id]);
