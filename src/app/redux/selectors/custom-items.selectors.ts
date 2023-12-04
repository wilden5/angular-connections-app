import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { ISearchItem } from '../../youtube/models/search-item.model';

export const selectAppState = createFeatureSelector<AppState>('appState');

export const selectCustomItems = createSelector(selectAppState, (state) => state.customItems);

export const selectSpecificCustomItem = (id: string): MemoizedSelector<AppState, ISearchItem | undefined> =>
  createSelector(selectCustomItems, (state): ISearchItem | undefined => state[id]);
