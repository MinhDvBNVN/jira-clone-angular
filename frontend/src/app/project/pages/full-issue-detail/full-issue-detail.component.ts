import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectConst } from '@trungk18/project/config/const';
import { JProject } from '@trungk18/interface/project';
import { untilDestroyed, UntilDestroy } from '@ngneat/until-destroy';
import { Observable } from 'rxjs';
import { JIssue } from '@trungk18/interface/issue';
import { DeleteIssueModel } from '@trungk18/interface/ui-model/delete-issue-model';
import {Store} from '@ngrx/store';
import * as projectSelector from '../../state/selectors/project.selector';
import * as projectAction from '../../state/actions/project.action';
import {delay, map} from "rxjs/operators";
@Component({
  selector: 'full-issue-detail',
  templateUrl: './full-issue-detail.component.html',
  styleUrls: ['./full-issue-detail.component.scss']
})
@UntilDestroy()
export class FullIssueDetailComponent implements OnInit {
  project: JProject;
  issueById$: Observable<JIssue>;
  issueId: string;
  get breadcrumbs(): string[] {
    return [ProjectConst.Projects, this.project?.name, 'Issues', this.issueId];
  }

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.getIssue();
    this.store.select(projectSelector.all$).pipe(untilDestroyed(this)).subscribe((project) => {
      this.project = project;
    });
  }

  private getIssue() {
    this.issueId = this._route.snapshot.paramMap.get(ProjectConst.IssueId);
    if (!this.issueId) {
      this.backHome();
      return;
    }
    this.issueById$ = this.issueById(this.issueId);
  }

  issueById(issueId: string){
    return this.store.select(projectSelector.issues$).pipe(
      delay(500),
      map((issues) => {
        const issue = issues.find(x => x.id === issueId);
        return issue;
      })
    );
  }

  deleteIssue({issueId, deleteModalRef}: DeleteIssueModel) {
    this.store.dispatch(projectAction.deleteIssueSuccess({issueId}));
    deleteModalRef.close();
    this.backHome();
  }

  private backHome() {
    this._router.navigate(['/']);
  }
}
