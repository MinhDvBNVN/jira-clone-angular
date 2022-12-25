import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {JIssue} from '@trungk18/interface/issue';
import {IssuePriorityIcon} from '@trungk18/interface/issue-priority-icon';
import {JUser} from '@trungk18/interface/user';
import {IssueUtil} from '@trungk18/project/utils/issue';
import {NzModalService} from 'ng-zorro-antd/modal';
import {IssueModalComponent} from '../issue-modal/issue-modal.component';
import {Store} from '@ngrx/store';
import * as projectSelector from '../../../state/selectors/project.selector';
import {delay, map} from 'rxjs/operators';

@Component({
  selector: 'issue-card',
  templateUrl: './issue-card.component.html',
  styleUrls: ['./issue-card.component.scss']
})
@UntilDestroy()
export class IssueCardComponent implements OnChanges, OnInit {
  @Input() issue: JIssue;
  assignees: JUser[];
  issueTypeIcon: string;
  priorityIcon: IssuePriorityIcon;

  constructor(private _modalService: NzModalService, private store: Store) {}

  ngOnInit(): void {
    this.store.select(projectSelector.user$).pipe(untilDestroyed(this)).subscribe((users) => {
      this.assignees = users.filter((user: JUser) => {
        return this.issue.userIds.some((a: any) => a === user.id);
      });
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('issue' in changes) {
      const issueChange = changes.issue;
      if (issueChange?.currentValue !== issueChange.previousValue) {
        this.issueTypeIcon = IssueUtil.getIssueTypeIcon(this.issue.type);
        this.priorityIcon = IssueUtil.getIssuePriorityIcon(this.issue.priority);
      }
    }
  }

  issueById$(issueId: string){
    return this.store.select(projectSelector.issues$).pipe(
      delay(500),
      map((issues) => {
        return issues.find(x => x.id === issueId);
      })
    );
  }

  openIssueModal(issueId: string) {
    this._modalService.create({
      nzContent: IssueModalComponent,
      nzWidth: 1040,
      nzClosable: false,
      nzFooter: null,
      nzComponentParams: {
        issue$: this.issueById$(issueId)
      }
    });
  }
}
