import {Action, createReducer, on} from '@ngrx/store';
import * as filterAction from '../actions/filter.action';

export interface FilterState {
  searchTerm: string;
  userIds: string[];
  onlyMyIssue: boolean;
  ignoreResolved: boolean;
  isLoading: boolean;
}

export const initialState: FilterState = {
  searchTerm: '',
  userIds: [],
  onlyMyIssue: false,
  ignoreResolved: false,
  isLoading: false
};

export const filterReducer = createReducer(
  initialState,
  on(filterAction.updateSearchTerm, (state, action) => {
    return {
      ...state,
      searchTerm: action.term
    };
  }),
  on(filterAction.toggleUserID, (state, result) => ({...this.state, isLoading: true})),
  on(filterAction.toggleUserIDSuccess, (state, action) => {
    const hasUser = state.userIds.includes(action.userId);
    const userIds = hasUser
      ? state.userIds.filter((x) => x !== action.userId)
      : [...state.userIds, action.userId];
    return {
      ...state,
      userIds,
      isLoading: false
    };
  }),
  on(filterAction.toggleOnlyMyIssue, ((state, action) => ({...state, isLoading: true}))),
  on(filterAction.toggleOnlyMyIssueSuccess, (state, action) => {
    const onlyMyIssue = !state.onlyMyIssue;
    return {
      ...state,
      onlyMyIssue,
      isLoading: true
    };
  }),
  on(filterAction.toggleIgnoreResolve, (state => ({...state, isLoading: true}))),
  on(filterAction.toggleIgnoreResolveSuccess, ((state, action) => {
    const ignoreResolved = !state.ignoreResolved;
    return {
      ...state,
      ignoreResolved,
      isLoading: false
    };
  }))
);

export function reducer(state: FilterState | undefined, action: Action): any {
  return filterReducer(state, action);
}
