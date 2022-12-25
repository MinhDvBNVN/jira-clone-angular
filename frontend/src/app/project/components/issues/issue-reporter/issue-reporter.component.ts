import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { JIssue } from '@trungk18/interface/issue';
import { JUser } from '@trungk18/interface/user';
import * as projectAction from '../../../state/actions/project.action';
import {Store} from '@ngrx/store';

@Component({
  selector: 'issue-reporter',
  templateUrl: './issue-reporter.component.html',
  styleUrls: ['./issue-reporter.component.scss']
})
@UntilDestroy()
export class IssueReporterComponent implements OnInit, OnChanges {
  @Input() issue: JIssue;
  @Input() users: JUser[];
  reporter: JUser;

  constructor(private store: Store) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges) {
    if ('issue' in changes) {
      const issueChange = changes.issue;
      if (this.users && issueChange.currentValue !== issueChange.previousValue) {
        this.reporter = this.users.find((x) => x.id === this.issue.reporterId);
      }
    }
  }

  isUserSelected(user: JUser) {
    return user.id === this.issue.reporterId;
  }

  updateIssue(user: JUser) {
    this.store.dispatch(projectAction.updateIssue({
      newIssue: {
        ...this.issue,
        reporterId: user.id
      }
    }));
  }
}
