import { createReducer, on } from '@ngrx/store';
import { ISearchItem } from '../../youtube/models/search-item.model';
import { loadYoutubeItems } from '../actions/youtube-item.actions';

export const initialYoutubeItemState: ISearchItem[] = [];

export const youtubeItemReducer = createReducer(
  initialYoutubeItemState,
  on(loadYoutubeItems, (state, { youtubeItem }) => youtubeItem)
);
