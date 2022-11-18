import {createFeatureSelector, createSelector} from '@ngrx/store';
import {FilterState} from '@trungk18/project/state/reducers/filter.reducer';

export const getFilterState = createFeatureSelector<FilterState>('filter');

export const any$ = createSelector(
  getFilterState,
  ({ searchTerm, userIds, onlyMyIssue, ignoreResolved }: FilterState) => {
    return !!searchTerm || !!userIds?.length || onlyMyIssue || ignoreResolved;
  }
);

export const all$ = createSelector(
  getFilterState, (state: FilterState) => {
    return state;
  }
);

export const userIds$ = createSelector(
  getFilterState,
  (state: FilterState) => {
    return state.userIds;
  }
);

export const onlyMyIssue$ = createSelector(
  getFilterState,
  (state: FilterState) => {
    return state.onlyMyIssue;
  }
);

export const ignoreResolve$ = createSelector(
  getFilterState,
  (state: FilterState) => {
    return state.ignoreResolved;
  }
);
