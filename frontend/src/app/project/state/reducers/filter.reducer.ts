import {Action, createReducer} from '@ngrx/store';

export interface FilterState {
  searchTerm: string;
  userIds: string[];
  onlyMyIssue: boolean;
  ignoreResolved: boolean;
}

export const initialState: FilterState = {
  searchTerm: '',
  userIds: [],
  onlyMyIssue: false,
  ignoreResolved: false
};

export const filterReducer = createReducer(
  initialState
);

export function reducer(state: FilterState | undefined, action: Action): any {
  return filterReducer(state, action);
}
