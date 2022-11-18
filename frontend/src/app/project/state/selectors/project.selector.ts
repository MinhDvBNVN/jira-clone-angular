import {createFeatureSelector, createSelector} from '@ngrx/store';
import {ProjectState} from '@trungk18/project/state/reducers/project.reducer';

export const getProjectState = createFeatureSelector<ProjectState>('project');

export const isLoading = createSelector(
  getProjectState,
  (state: ProjectState) => {
    return state.isLoading;
  }
);

export const all$ = createSelector(
  getProjectState, (state: ProjectState) => {
    return state;
  }
);

export const issues$ = createSelector(
  getProjectState,
  (state: ProjectState) => {
    return state.issues;
  }
);

export const user$ = createSelector(
  getProjectState,
  (state: ProjectState) => {
    return state.users;
  }
);
