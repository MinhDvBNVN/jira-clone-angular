import { Component, OnInit } from '@angular/core';
import { ProjectService } from './state/project/project.service';
import { AuthService, LoginPayload } from './auth/auth.service';
import * as projectAction from '../project/state/actions/project.action';
import * as authAction from '../project/state/actions/auth.action';
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
  expanded: boolean;
  constructor(private _projectService: ProjectService, private _authService: AuthService, private store: Store) {
    this.expanded = true;
  }

  ngOnInit(): void {
    this.store.dispatch(authAction.login(new LoginPayload()));
    this.store.dispatch(projectAction.getProject());
    this._projectService.getProject();
    this.handleResize();
  }

  handleResize() {
    const match = window.matchMedia('(min-width: 1024px)');
    match.addEventListener('change', (e) => {
      this.expanded = e.matches;
    });
  }

  manualToggle() {
    this.expanded = !this.expanded;
  }
}
