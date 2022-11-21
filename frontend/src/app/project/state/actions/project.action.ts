import {createAction, props} from '@ngrx/store';
import {JIssue} from "@trungk18/interface/issue";

export const GET_PROJECT = '[Project] Get Project';
export const GET_PROJECT_SUCCESS = '[Project] Get Project Success';
export const GET_PROJECT_FAILURE = '[Project] Get Project Failure';

export const UPDATE_PROJECT = '[Project] Update Project';
export const UPDATE_PROJECT_SUCCESS = '[Project] Update Project Success';
export const UPDATE_PROJECT_FAILURE = '[Project] Update Project Failure';

export const UPDATE_ISSUE = '[Project] Update Issue';
export const UPDATE_ISSUE_SUCCESS = '[Project] Update Issue Success';
export const UPDATE_ISSUE_FAILURE = '[Project] Update Issue Failure';

export const DELETE_ISSUE = '[Project] Delete Issue';
export const DELETE_ISSUE_SUCCESS = '[Project] Delete Issue Success';
export const DELETE_ISSUE_FAILURE = '[Project] Delete Issue Failure';

export const UPDATE_ISSUE_COMMENT = '[Project] Update Issue Comment';
export const UPDATE_ISSUE_COMMENT_SUCCESS = '[Project] Update Issue Comment Success';
export const UPDATE_ISSUE_COMMENT_FAILURE = '[Project] Update Issue Comment Failure';


export const getProject  = createAction(
  GET_PROJECT
);

export const getProjectSuccess = createAction(
  GET_PROJECT_SUCCESS,
  props<{project}>()
);

export const getProjectFailure = createAction(
  GET_PROJECT_FAILURE,
  props<any>()
  );

export const updateIssue  = createAction(
  UPDATE_ISSUE
);

export const updateIssueSuccess = createAction(
  UPDATE_ISSUE_SUCCESS,
  props<{newIssue: JIssue}>()
);

export const updateIssueFailure = createAction(
  UPDATE_ISSUE_FAILURE,
  props<any>()
);

export const updateProject  = createAction(
  UPDATE_PROJECT
);

export const updateProjectSuccess = createAction(
  UPDATE_PROJECT_SUCCESS,
  props<{formValue}>()
);

export const updateProjectFailure = createAction(
  UPDATE_PROJECT_FAILURE,
  props<any>()
);

export const deleteIssue  = createAction(
  DELETE_ISSUE
);

export const deleteIssueSuccess = createAction(
  DELETE_ISSUE_SUCCESS,
  props<{issueId}>()
);

export const deleteIssueFailure = createAction(
  DELETE_ISSUE_FAILURE,
  props<any>()
);

export const updateIssueComment  = createAction(
  UPDATE_ISSUE_COMMENT
);

export const updateIssueCommentSuccess = createAction(
  UPDATE_ISSUE_COMMENT_SUCCESS,
  props<{issueId, comment}>()
);

export const updateIssueCommentFailure = createAction(
  UPDATE_ISSUE_COMMENT_FAILURE,
  props<any>()
);
