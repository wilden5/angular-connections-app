import { createReducer, on } from '@ngrx/store';
import { IPersonTransformed } from '../../models/people.model';
import { loadPeopleListHttpSuccess, loadPeopleListStore } from './people.actions';

export interface PeopleState {
  peopleList: IPersonTransformed[];
}

export const initialPeopleState: PeopleState = {
  peopleList: [],
};

export const peopleReducer = createReducer(
  initialPeopleState,
  on(loadPeopleListHttpSuccess, (state, { peopleList }): PeopleState => ({ ...state, peopleList })),
  on(loadPeopleListStore, (state): PeopleState => ({ ...state }))
);
