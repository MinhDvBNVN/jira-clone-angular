import {JProject, ProjectCategory} from '@trungk18/interface/project';
import {Action, createReducer} from "@ngrx/store";

// tslint:disable-next-line:no-empty-interface
export interface ProjectState extends JProject {}

export const initialState: ProjectState = {
  id: null,
  name: null,
  url: null,
  description: null,
  category : ProjectCategory.SOFTWARE,
  createdAt: null,
  updateAt: null,
  issues: [],
  users: []
};

const projectRecuder = createReducer(
  initialState
);

export function reducer(state: ProjectState | undefined, action: Action): any {
  return projectRecuder(state, action);
}
