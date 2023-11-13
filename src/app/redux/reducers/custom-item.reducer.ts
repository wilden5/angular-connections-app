import { createReducer, on } from '@ngrx/store';
import { addCustomItem } from '../actions/custom-item.actions';
import { ISearchItem } from '../../youtube/models/search-item.model';

export const initialCustomItemState: ISearchItem[] = [];

export const customItemReducer = createReducer(
  initialCustomItemState,
  on(addCustomItem, (state, { customItem }) => [...state, customItem])
);
