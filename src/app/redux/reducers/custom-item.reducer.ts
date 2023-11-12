import { createReducer, on } from '@ngrx/store';
import { addCustomItem } from '../actions/custom-item.actions';
import { ICustomSearchItem } from '../../youtube/models/search-item.model';

export const initialCustomItemState: ICustomSearchItem[] = [];

export const customItemReducer = createReducer(
  initialCustomItemState,
  on(addCustomItem, (state, { customItem }) => [...state, customItem])
);
