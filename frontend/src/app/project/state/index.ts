import {ProjectState} from '@trungk18/project/state/reducers/project.reducer';
import {FilterState} from '@trungk18/project/state/reducers/filter.reducer';
import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import * as project from '@trungk18/project/state/reducers/project.reducer';
import * as filter from '@trungk18/project/state/reducers/filter.reducer';

export interface State {
  project: ProjectState;
  filter: FilterState;
}

export const reducers: ActionReducerMap<State> = {
  project: project.reducer,
  filter: filter.reducer
};

export const getAllIssues = createFeatureSelector<project.ProjectState>('issues');

export const allIssues = createSelector(getAllIssues, (state) => {
  return state.issues;
});
