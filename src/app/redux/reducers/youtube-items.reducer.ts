import { createReducer, on } from '@ngrx/store';
import { ISearchItem } from '../../youtube/models/search-item.model';
import { loadYoutubeItems, sortYoutubeItems } from '../actions/youtube-items.actions';

export const initialYoutubeItemsState: ISearchItem[] = [];

export const youtubeItemsReducer = createReducer(
  initialYoutubeItemsState,
  on(loadYoutubeItems, (state, { youtubeItems }) => youtubeItems),
  on(sortYoutubeItems, (state, { youtubeItems }) => youtubeItems)
);
