import { createReducer, on } from '@ngrx/store';
import { startLoading, stopLoading } from './spinner.actions';
import { ISpinnerStatus } from '../../models/spinner.model';

export const initialSpinnerState: ISpinnerStatus = {
  isLoading: false,
};

export const spinnerReducer = createReducer(
  initialSpinnerState,
  on(startLoading, (state): ISpinnerStatus => ({ ...state, isLoading: true })),
  on(stopLoading, (state): ISpinnerStatus => ({ ...state, isLoading: false }))
);
