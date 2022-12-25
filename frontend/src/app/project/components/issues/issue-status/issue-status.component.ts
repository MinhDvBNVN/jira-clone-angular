import { Component, Input, OnInit } from '@angular/core';
import { IssueStatus, IssueStatusDisplay, JIssue } from '@trungk18/interface/issue';
import {Store} from '@ngrx/store';
import * as projectSelector from '../../../state/selectors/project.selector';
import * as projectAction from '../../../state/actions/project.action';
import {filter, map} from 'rxjs/operators';
import {Observable} from 'rxjs';
@Component({
  selector: 'issue-status',
  templateUrl: './issue-status.component.html',
  styleUrls: ['./issue-status.component.scss']
})
export class IssueStatusComponent implements OnInit {
  @Input() issue: JIssue;
  IssueStatusDisplay = IssueStatusDisplay;

  variants = {
    [IssueStatus.BACKLOG]: 'btn-secondary',
    [IssueStatus.SELECTED]: 'btn-secondary',
    [IssueStatus.IN_PROGRESS]: 'btn-primary',
    [IssueStatus.DONE]: 'btn-success'
  };

  issueStatuses: IssueStatusValueTitle[];

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.issueStatuses = [
      new IssueStatusValueTitle(IssueStatus.BACKLOG),
      new IssueStatusValueTitle(IssueStatus.SELECTED),
      new IssueStatusValueTitle(IssueStatus.IN_PROGRESS),
      new IssueStatusValueTitle(IssueStatus.DONE)
    ];
  }

  lastIssuePosition = (status: IssueStatus): Observable<number> => {
    return this.store.select(projectSelector.issues$)
      .pipe(filter((x: any) => {
        return x.status === status;
      }), map((i: any) => i.length));
  }

  updateIssue(status: IssueStatus) {
    this.lastIssuePosition(status).subscribe(length => {
      this.store.dispatch(projectAction.updateIssue({newIssue: {
          ...this.issue,
          status,
          listPosition: length + 1
        }}));
    });
  }

  isStatusSelected(status: IssueStatus) {
    return this.issue.status === status;
  }
}

class IssueStatusValueTitle {
  value: IssueStatus;
  label: string;
  constructor(issueStatus: IssueStatus) {
    this.value = issueStatus;
    this.label = IssueStatusDisplay[issueStatus];
  }
}
