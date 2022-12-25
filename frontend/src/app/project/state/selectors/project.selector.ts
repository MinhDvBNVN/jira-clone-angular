import {createFeatureSelector, createSelector} from '@ngrx/store';
import {ProjectState} from '@trungk18/project/state/reducers/project.reducer';
import {IssueStatus, JIssue} from "@trungk18/interface/issue";

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

export const lastPositionInBacklog$ = createSelector(
  getProjectState,
  (state: ProjectState) => {
    if (!state.issues) {
      return;
    }
    const listBacklog = state.issues?.filter((issue: JIssue) => issue.status === IssueStatus.BACKLOG).
    sort((a, b) => b.listPosition - a.listPosition);
    return listBacklog.length > 0 ? listBacklog[0].listPosition : 0;
  }
);

export const user$ = createSelector(
  getProjectState,
  (state: ProjectState) => {
    return state.users;
  }
);
