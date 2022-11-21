import {createAction, props} from '@ngrx/store';

export const UPDATE_SEARCH_TERM = '[Filter] Update Search Term';

export const TOGGLE_USER_ID = '[Filter] Toggle User ID';
export const TOGGLE_USER_ID_SUCCESS = '[Filter] Toggle User ID Success';
export const TOGGLE_USER_ID_FAILURE = '[Filter] Toggle User ID Failure';

export const TOGGLE_ONLY_MY_ISSUE = '[Filter] Toggle Only My Issue';
export const TOGGLE_ONLY_MY_ISSUE_SUCCESS = '[Filter] Toggle Only My Issue Success';
export const TOGGLE_ONLY_MY_ISSUE_FAILURE = '[Filter] Toggle Only My Issue Failure';


export const TOGGLE_IGNORE_RESOLVE = '[Filter] Toggle Ignore Resolve';
export const TOGGLE_IGNORE_RESOLVE_SUCCESS = '[Filter] Toggle Ignore Resolve Success';
export const TOGGLE_IGNORE_RESOLVE_FAILURE = '[Filter] Toggle Ignore Resolve Failure';


export const updateSearchTerm = createAction(
  UPDATE_SEARCH_TERM,
  props<{term}>()
);

export const toggleUserID = createAction(
  TOGGLE_USER_ID,
  props<any>()
);

export const toggleUserIDSuccess = createAction(
  TOGGLE_USER_ID_SUCCESS,
  props<{ userId }>()
);

export const toggleUserIDFailure = createAction(
  TOGGLE_USER_ID_FAILURE,
  props<any>()
);

export const toggleOnlyMyIssue = createAction(
  TOGGLE_ONLY_MY_ISSUE
);

export const toggleOnlyMyIssueSuccess = createAction(
  TOGGLE_ONLY_MY_ISSUE_SUCCESS,
  props<any>()
);

export const toggleOnlyMyIssueFailure = createAction(
  TOGGLE_ONLY_MY_ISSUE_FAILURE,
  props<any>()
);


export const toggleIgnoreResolve = createAction(
  TOGGLE_ONLY_MY_ISSUE
);

export const toggleIgnoreResolveSuccess = createAction(
  TOGGLE_ONLY_MY_ISSUE_SUCCESS,
  props<any>()
);

export const toggleIgnoreResolveFailure = createAction(
  TOGGLE_ONLY_MY_ISSUE_FAILURE,
  props<any>()
);
