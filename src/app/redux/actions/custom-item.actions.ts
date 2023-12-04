import { createAction, props } from '@ngrx/store';
import { ISearchItem } from '../../youtube/models/search-item.model';

export const addCustomItem = createAction('[CUSTOM ITEM] Add Custom Item', props<{ customItem: ISearchItem }>());

export const deleteCustomItem = createAction('[CUSTOM ITEM] Delete Custom Item', props<{ id: string }>());
