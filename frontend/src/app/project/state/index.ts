import {ProjectState} from '@trungk18/project/state/reducers/project.reducer';
import {FilterState} from '@trungk18/project/state/reducers/filter.reducer';
import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import * as project from '@trungk18/project/state/reducers/project.reducer';
import * as filter from '@trungk18/project/state/reducers/filter.reducer';
import * as auth from '@trungk18/project/state/reducers/auth.reducer';
import {AuthState} from '@trungk18/project/state/reducers/auth.reducer';

export interface State {
  project: ProjectState;
  filter: FilterState;
  auth: AuthState;
}

export const reducers: ActionReducerMap<State> = {
  project: project.reducer,
  filter: filter.reducer,
  auth: auth.reducer
};
