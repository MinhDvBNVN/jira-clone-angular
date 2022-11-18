import {createAction, props} from '@ngrx/store';

export const LOGIN = '[AUTH] Login';

export const LOGIN_SUCCESS = '[AUTH] Login success';

export const LOGIN_FAILURE = '[AUTH] Login failure';

export const login = createAction(
  LOGIN,
  props<{email: string, password: string}>()
);

export const loginSuccess = createAction(
  LOGIN_SUCCESS,
  props<{user: any}>()
);

export const loginFailure = createAction(
  LOGIN_FAILURE,
  props<{message: any}>()
);

