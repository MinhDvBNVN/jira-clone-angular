import { Component, OnInit } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import {IssueStatus, JIssue} from '@trungk18/interface/issue';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import * as projectSelector from '../../../state/selectors/project.selector';
import * as authSelector from '../../../state/selectors/auth.selector';

@UntilDestroy()
@Component({
  selector: 'board-dnd',
  templateUrl: './board-dnd.component.html',
  styleUrls: ['./board-dnd.component.scss']
})
export class BoardDndComponent implements OnInit {
  issueStatuses: IssueStatus[] = [
    IssueStatus.BACKLOG,
    IssueStatus.SELECTED,
    IssueStatus.IN_PROGRESS,
    IssueStatus.DONE
  ];

  userId$: Observable<any>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.userId$ = this.store.select(authSelector.userId$);
  }

  issueByStatusSorted$ = (status: IssueStatus): Observable<JIssue[]> => {
    return this.store.select(projectSelector.issues$).pipe(
      map((issues) => {
        const filteredIssues = issues
          .filter((x) => x.status === status)
          .sort((a, b) => a.listPosition - b.listPosition);
        return filteredIssues;
      })
    );
  }

}
