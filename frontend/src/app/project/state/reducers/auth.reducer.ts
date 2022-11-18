import {Action, createReducer, on} from "@ngrx/store";
import * as authAction from '@trungk18/project/state/actions/auth.action';

export interface AuthState {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  createdAt: string;
  updatedAt: string;
  issueIds: string[];
  isLoading: boolean;
  token: string;
}

export const initialState: AuthState = {
  id: '',
  name: '',
  email: '',
  avatarUrl: '',
  createdAt: '',
  updatedAt: '',
  issueIds: [],
  isLoading: false,
  token: `${new Date().getTime()}`
};

export const authReducer = createReducer(
  initialState,
  on(authAction.login, ((state, action) => {
    return {
      ...state,
      isLoading: true
    };
  }))
);

export function reducer(state: AuthState | undefined, action: Action): any {
  return authReducer(state, action);
}
