import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { JIssue, IssuePriority } from '@trungk18/interface/issue';
import { IssuePriorityIcon } from '@trungk18/interface/issue-priority-icon';
import { IssueUtil } from '@trungk18/project/utils/issue';
import { ProjectConst } from '@trungk18/project/config/const';
import * as projectAction from '../../../state/actions/project.action';
import {Store} from '@ngrx/store';
@Component({
  selector: 'issue-priority',
  templateUrl: './issue-priority.component.html',
  styleUrls: ['./issue-priority.component.scss']
})
export class IssuePriorityComponent implements OnInit, OnChanges {
  selectedPriority: IssuePriority;

  get selectedPriorityIcon() {
    return IssueUtil.getIssuePriorityIcon(this.selectedPriority);
  }

  priorities: IssuePriorityIcon[];

  @Input() issue: JIssue;

  constructor(private store: Store) {}

  ngOnInit() {
    this.priorities = ProjectConst.PrioritiesWithIcon;
  }

  ngOnChanges(): void {
    this.selectedPriority = this.issue?.priority;
  }

  isPrioritySelected(priority: IssuePriority) {
    return priority === this.selectedPriority;
  }

  updateIssue(priority: IssuePriority) {
    this.selectedPriority = priority;
    this.store.dispatch(projectAction.updateIssue({newIssue: {
        ...this.issue,
        priority: this.selectedPriority
      }}));
  }
}
