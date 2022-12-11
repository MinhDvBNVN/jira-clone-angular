import {JProject, ProjectCategory} from '@trungk18/interface/project';
import {Action, createReducer, on} from '@ngrx/store';
import * as projectAction from '../actions/project.action';
import {DateUtil} from '@trungk18/project/utils/date';
import {arrayRemove, arrayUpsert} from '@datorama/akita';

// tslint:disable-next-line:no-empty-interface
export interface ProjectState extends JProject {
  isLoading: boolean;
}

export const initialState: ProjectState = {
  id: null,
  name: null,
  url: null,
  description: null,
  category : ProjectCategory.SOFTWARE,
  createdAt: null,
  updateAt: null,
  issues: [],
  users: [],
  isLoading: false
};

const projectRecuder = createReducer(
  initialState,
  on(projectAction.getProject, (state, result) => {
    return {
      ...state,
      isLoading: true
    };
  }),
  on(projectAction.getProjectSuccess, (state, action) => {
    return {
      ...state,
      ...action.project,
      isLoading: false
    };
  }),
  on(projectAction.updateProject, (state, result) => ({...state, isLoading: true})),
  on(projectAction.updateProjectSuccess, (state, action) => {
    return {
      ...state,
      ...action.formValue,
      isLoading: false
    };
  }),
  on(projectAction.updateIssue, (state, result) => ({...state, isLoading: true})),
  on(projectAction.updateIssueSuccess, (state, action) => {
    const newIssue = Object.assign({}, action.newIssue);
    newIssue.updatedAt = DateUtil.getNow();
    const issues = arrayUpsert(state.issues, newIssue.id, newIssue);
    return {
      ...state,
      issues,
      isLoading: false
    };
  }),
  on(projectAction.deleteIssue, (state, result) => ({...state, isLoading: true})),
  on(projectAction.deleteIssueSuccess, (state, action) => {
    const issues = arrayRemove(state.issues, action.issueId);
    return {
      ...state,
      issues,
      isLoading: false
    };
  }),
  on(projectAction.updateIssueComment, (state, result) => ({...state, isLoading: true})),
  on(projectAction.updateIssueCommentSuccess, (state, action) => {
    const allIssues = state.issues;
    const issue = allIssues.find((x) => x.id === action.issueId);
    if (!issue) {
      return;
    }
    const comments = arrayUpsert(issue.comments ?? [], action.comment.id, action.comment);
    return  {
      ...state,
      ...issue,
      comments
    };
  })
);

export function reducer(state: ProjectState | undefined, action: Action): any {
  return projectRecuder(state, action);
}
