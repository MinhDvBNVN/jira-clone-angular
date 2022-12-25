import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { IssueType, JIssue } from '@trungk18/interface/issue';
import { IssueTypeWithIcon } from '@trungk18/interface/issue-type-icon';
import { IssueUtil } from '@trungk18/project/utils/issue';
import { ProjectConst } from '@trungk18/project/config/const';
import * as projectAction from '../../../state/actions/project.action';
import {Store} from '@ngrx/store';
@Component({
  selector: 'issue-type',
  templateUrl: './issue-type.component.html',
  styleUrls: ['./issue-type.component.scss']
})
export class IssueTypeComponent implements OnInit, OnChanges {
  @Input() issue: JIssue;

  get selectedIssueTypeIcon(): string {
    return IssueUtil.getIssueTypeIcon(this.issue.type);
  }

  issueTypes: IssueTypeWithIcon[];

  constructor(private store: Store) {
    this.issueTypes = ProjectConst.IssueTypesWithIcon;
  }

  ngOnInit() {}

  ngOnChanges(): void {}

  updateIssue(issueType: IssueType) {
    this.store.dispatch(projectAction.updateIssue({
      newIssue: {
        ...this.issue,
        type: issueType
      }
    }));
  }

  isTypeSelected(type: IssueType) {
    return this.issue.type === type;
  }
}
