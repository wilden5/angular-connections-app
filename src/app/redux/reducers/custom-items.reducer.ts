import { createReducer, on } from '@ngrx/store';
import { addCustomItem, deleteCustomItem } from '../actions/custom-item.actions';
import { ISearchItem } from '../../youtube/models/search-item.model';

export const initialCustomItemState: ISearchItem[] = [];

export const customItemsReducer = createReducer(
  initialCustomItemState,
  on(addCustomItem, (state, { customItem }) => [...state, customItem]),
  on(deleteCustomItem, (state, { id }) => state.filter((customItem) => customItem.id.videoId !== id))
);
