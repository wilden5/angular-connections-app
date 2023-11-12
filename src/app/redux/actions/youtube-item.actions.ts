import { createAction, props } from '@ngrx/store';
import { ISearchItem } from '../../youtube/models/search-item.model';

export const loadYoutubeItems = createAction(
  '[YOUTUBE ITEM] Load Youtube Items',
  props<{ youtubeItem: ISearchItem[] }>()
);
