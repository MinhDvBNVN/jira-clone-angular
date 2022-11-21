import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { JIssue } from '@trungk18/interface/issue';
import * as projectAction from '../../../state/actions/project.action';
import {Store} from '@ngrx/store';
@Component({
  selector: 'issue-title',
  templateUrl: './issue-title.component.html',
  styleUrls: ['./issue-title.component.scss']
})
export class IssueTitleComponent implements OnChanges {
  @Input() issue: JIssue;
  titleControl: FormControl;

  constructor(private store: Store) {}

  ngOnChanges(changes: SimpleChanges): void {
    const issueChange = changes.issue;
    if (issueChange.currentValue !== issueChange.previousValue) {
      this.titleControl = new FormControl(this.issue.title);
    }
  }

  onBlur() {
    this.store.dispatch(projectAction.updateIssueSuccess({newIssue: {
        ...this.issue,
        title: this.titleControl.value
      }}));
  }
}
