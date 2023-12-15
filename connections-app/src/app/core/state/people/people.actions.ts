import { createAction, props } from '@ngrx/store';
import { IPersonTransformed } from '../../models/people.model';
import { IServerError } from '../../models/server-error.model';

export const loadPeopleList = createAction('[PEOPLE] Load People List Request');

export const loadPeopleListHttpSuccess = createAction(
  '[PEOPLE] Load People List Http Success',
  props<{ peopleList: IPersonTransformed[] }>()
);

export const loadPeopleListHttpFailure = createAction(
  '[PEOPLE] Load People List Http Failure',
  props<{ error: IServerError }>()
);

export const loadPeopleListStore = createAction('[PEOPLE] Load People List Store');

export const loadPeopleListDirectHttp = createAction(
  '[PEOPLE] Load People List Direct Http Request'
);
