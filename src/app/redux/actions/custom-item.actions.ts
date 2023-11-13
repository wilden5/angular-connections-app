import { createAction, props } from '@ngrx/store';
import { ISearchItem } from '../../youtube/models/search-item.model';

export const addCustomItem = createAction('[CUSTOM ITEM] Add Custom Item', props<{ customItem: ISearchItem }>());
