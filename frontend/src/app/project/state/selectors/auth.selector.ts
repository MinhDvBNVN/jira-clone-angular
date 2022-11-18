import {createFeatureSelector, createSelector} from '@ngrx/store';
import {AuthState} from '@trungk18/project/state/reducers/auth.reducer';

export const getAuthState = createFeatureSelector<AuthState>('auth');

export const user$ = createSelector(
  getAuthState,
  (state) => {
    return state;
  }
);

export const userId$ = createSelector(
  getAuthState,
  (state) => {
    return state.id;
  }
);
